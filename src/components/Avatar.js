import React, {useState, useEffect} from 'react';
import {Image, View as DefaultView} from 'react-native';
import {moderateScale} from '../libs/scaling';
import {Helper} from '../libs/Helper';
import {Colors} from '../themes';

export default function Avatar(props) {
  const {source, size = moderateScale(44), children, style} = props;

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
    <DefaultView
      style={[
        {
          width: size,
          height: size,
        },
        style,
      ]}>
      <Image
        style={{
          width: size,
          height: size,
          borderRadius: size * 0.5,
          borderColor: Colors.divider,
          borderWidth: moderateScale(1),
        }}
        source={dataSource}
        onError={() => setDataSource(defaultImage)}
      />
      {children}
    </DefaultView>
  );
}
