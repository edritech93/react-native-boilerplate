import React, {useState, useEffect} from 'react';
import {View as DefaultView, Image} from 'react-native';
import {moderateScale} from '../libs/scaling';
import Badge from './Badge';

export default function IconWithBadge(props) {
  const {name, badgeCount} = props;

  const defaultImage = require('./../assets/images/arrow_left.png');
  const [image, setImage] = useState(defaultImage);

  useEffect(() => {
    let imageSrc = defaultImage;
    switch (name) {
      case 'Home':
        imageSrc = require('./../assets/images/arrow_left.png');
        break;

      case 'Order':
        imageSrc = require('./../assets/images/arrow_left.png');
        break;

      case 'Notification':
        imageSrc = require('./../assets/images/arrow_left.png');
        break;

      default:
        break;
    }
    setImage(imageSrc);
  }, [name]);

  return (
    <DefaultView
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Image
        source={image}
        style={{
          width: moderateScale(24),
          height: moderateScale(24),
        }}
      />

      <Badge
        count={badgeCount}
        style={{
          position: 'absolute',
          right: moderateScale(-14),
          top: moderateScale(2),
        }}
      />
    </DefaultView>
  );
}
