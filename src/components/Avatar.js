import React, {useState, useEffect} from 'react';
import {Avatar as AvatarPaper} from 'react-native-paper';
import {moderateScale} from '../libs/scaling';
import {Helper} from '../libs/Helper';

export default function Avatar(props) {
  const {
    source,
    size = moderateScale(44),
    children,
    style,
    type = 'Image',
    label = 'Default',
    ...restProps
  } = props;

  const defaultImage = require('../assets/images/profile_placeholder-100.png');
  const [dataSource, setDataSource] = useState(defaultImage);

  useEffect(() => {
    const _loadToken = async () => {
      const dataToken = await Helper.getToken();
      if (source) {
        setDataSource({
          uri: source,
          headers: {
            Authorization: `Bearer ${dataToken}`,
          },
        });
      }
    };
    _loadToken();
  }, [source]);

  return (
    <>
      {type === 'Icon' && (
        <AvatarPaper.Icon
          size={size}
          icon={source ?? dataSource}
          {...restProps}
        />
      )}
      {type === 'Image' && (
        <AvatarPaper.Image
          size={size}
          source={source ?? dataSource}
          {...restProps}
        />
      )}
      {type === 'Text' && (
        <AvatarPaper.Text size={size} label={label} {...restProps} />
      )}
    </>
  );
}
