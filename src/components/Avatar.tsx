import React, {useEffect, useState} from 'react';
import {ImageSourcePropType, ViewProps} from 'react-native';
import {Avatar as AvatarPaper} from 'react-native-paper';
import {DEF_AVATAR} from '../constants';
import {moderateScale} from '../libs/scaling';
import {Helper} from '../libs/Helper';

interface AvatarProps extends ViewProps {
  source?: string | null;
  size?: number;
  type: 'image' | 'icon' | 'text';
  label?: string;
}

export default function Avatar(props: AvatarProps) {
  const {
    source,
    size = moderateScale(44),
    type = 'image',
    label = 'Default',
    ...restProps
  } = props;

  const [dataSource, setDataSource] = useState<ImageSourcePropType>(DEF_AVATAR);

  useEffect(() => {
    const _loadToken = async () => {
      const token = await Helper.getToken();
      if (source && token) {
        setDataSource({
          uri: source,
          headers: {Authorization: `Bearer ${token}`},
        });
      }
    };
    _loadToken();
  }, [source]);

  switch (type) {
    case 'image':
      return (
        <AvatarPaper.Image size={size} source={dataSource} {...restProps} />
      );

    case 'icon':
      return <AvatarPaper.Icon size={size} icon={dataSource} {...restProps} />;

    case 'text':
      return <AvatarPaper.Text size={size} label={label} {...restProps} />;

    default:
      return null;
  }
}
