import React, { Component } from 'react';

import PropTypes from 'prop-types';
import cx from 'classnames';

type P = {
    type: "articleTile" | "article",
    count: number;
}

class Skeleton extends Component<P, {}> {
    static defaultProps = {
        count: 1
    }

    constructor(props: P) {
        super(props)
    }

    render() {
        const { type, count } = this.props;
        const typeClass = `skeleton-${type}`;
        const countArr = new Array(count).fill(0);

        return countArr.map((item, i) => <div key={`skeleton_${type}_${i}`} className={cx('skeleton', typeClass)}></div >);
    }
}

export default Skeleton;
