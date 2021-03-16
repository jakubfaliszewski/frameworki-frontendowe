import { ImgHTMLAttributes } from 'react';
import cx from 'classnames';

interface P extends ImgHTMLAttributes<HTMLImageElement> {
    skeletonize?: boolean;
}
const Img = (props: P) => {
    const { skeletonize, ...otherProps } = props;

    return <img {...otherProps} className={cx(skeletonize ?'img-skeleton' : null, props.className)} alt={props.alt} />
};

export default Img;
