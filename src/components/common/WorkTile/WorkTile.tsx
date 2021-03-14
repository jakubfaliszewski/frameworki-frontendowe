import React, { Component, RefObject } from 'react';
import { formatDate, getRandomDate } from '../../../utils/dateUtils';

import { IComment } from './../../../utils/Rest';
import UserSignature from './..//UserSignature/UserSignature';
import cx from 'classnames';
import styles from "./WorkTile.module.scss";

type P = {
    work: IComment,
}

class WorkTile extends Component<P, {}> {

    randomDate = formatDate(getRandomDate());

    constructor(props: P) {
        super(props)
    }

    render() {
        const { work } = this.props;

        return (
            <div className={styles.WorkTile}>
                <div>
                    <h3 className={cx(styles.WorkTileName, 'header-3 firstLetterUpper')}>{work.name}</h3>
                    <p className={styles.WorkTileBody} >{work.body}</p>
                    <UserSignature type="company" onWhiteBg company={work.post?.user?.company.name} name={work.post?.user?.name} imageSrc={work.post?.user?.photo?.thumbnailUrl} />
                </div>
            </div>
        );
    }
}

export default WorkTile;
