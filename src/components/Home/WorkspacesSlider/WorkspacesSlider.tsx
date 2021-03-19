import { BiBookAlt, BiBuildings } from 'react-icons/bi';
import { FcBusiness, FcFlowChart, FcSurvey } from "react-icons/fc";
import React, { Component, RefObject } from 'react';
import { formatDate, newMomentDate } from '../../../utils/dateUtils';

import { FiUsers } from "react-icons/fi";
import { IWorkspace } from '../../../utils/Rest';
import { Link } from 'react-router-dom';
import RestService from '../../../utils/RestService';
import { RiNewspaperLine } from "react-icons/ri";
import styles from "./WorkspacesSlider.module.scss";

type S = {
    workspaces: Array<IWorkspace> | null
}

class WorkspacesSlider extends Component<{}, S> {
    slider: RefObject<HTMLDivElement> = React.createRef();
    pos = { top: 0, left: 0, x: 0, y: 0, inMove: false };
    constructor(props: {}) {
        super(props);
        this.state = {
            workspaces: null
        }

        this.mouseDownHandler = this.mouseDownHandler.bind(this);
        this.mouseClickHandler = this.mouseClickHandler.bind(this);
        this.mouseMoveHandler = this.mouseMoveHandler.bind(this);
        this.mouseUpHandler = this.mouseUpHandler.bind(this);
    }

    componentDidMount() {
        const service = new RestService();
        this.setState({
            workspaces: service.getWorkspaces()
        })
        this.slider.current?.addEventListener('mousedown', this.mouseDownHandler);
        this.slider.current?.addEventListener('click', this.mouseClickHandler);
    }

    componentWillUnmount() {
        this.slider.current?.removeEventListener('mousedown', this.mouseDownHandler);
        this.slider.current?.removeEventListener('click', this.mouseClickHandler);
    }

    mouseClickHandler(e: MouseEvent) {
        if(this.pos.inMove) {
            e.preventDefault();
            e.stopPropagation();
        }
    }

    mouseDownHandler(e: MouseEvent) {
        e.preventDefault();
        e.stopPropagation();
        const ele = this.slider.current as HTMLDivElement;
        this.pos.left= ele.scrollLeft;
        this.pos.top= ele.scrollTop;
        this.pos.x= e.clientX;
        this.pos.y= e.clientY;
        

        document.addEventListener('mousemove', this.mouseMoveHandler);
        document.addEventListener('mouseup', this.mouseUpHandler);
    };

    mouseMoveHandler(e: MouseEvent) {
        this.pos.inMove = true;
        const ele = this.slider.current as HTMLDivElement;
        const dx = e.clientX - this.pos.x;
        const dy = e.clientY - this.pos.y;
        ele.scrollTop = this.pos.top - dy;
        ele.scrollLeft = this.pos.left - dx;
    };

    mouseUpHandler(e: MouseEvent) {
        e.preventDefault();
        e.stopPropagation();
        document.removeEventListener('mousemove', this.mouseMoveHandler);
        document.removeEventListener('mouseup', this.mouseUpHandler);
        
        setTimeout(() => {
            this.pos.inMove = false;
        }, 0);
    };

    getLogo(type: IWorkspace['type']) {
        let Icon;
        switch (type) {
            case 'Contarct': Icon = FcSurvey; break;
            case 'Corporate': Icon = FcBusiness; break;
            case 'Norms': Icon = FcFlowChart; break;
            default: Icon = FcSurvey; break;
        }
        return Icon && <Icon className={styles.tileLogo} />;
    }

    getIcon(type: IWorkspace['type']) {
        let Icon;
        switch (type) {
            case 'Contarct': Icon = RiNewspaperLine; break;
            case 'Corporate': Icon = BiBuildings; break;
            case 'Norms': Icon = BiBookAlt; break;
            default: Icon = RiNewspaperLine; break;
        }
        return Icon && <Icon />;
    }

    getWorkspaceTile(work: IWorkspace) {
        return <Link className={styles.tile} to={`/workspace/${work.id}`} key={`ws_${work.id}`}>
            <div>
            <div className={styles.tileBg} style={{ backgroundImage: `url(${work.background})` }}></div>
            <div className={styles.tileContent}>
                <div className={styles.tileTitle}>
                    {this.getLogo(work.type)}
                    <h3>{work.title}</h3>
                </div>
                <div className={styles.tileInfo}>
                    {this.getIcon(work.type)}
                    <span>{work.type}</span>
                    <div className={styles.separator} />
                    <FiUsers />
                    <span>{work.users} users</span>
                </div>
                <time>Last update {formatDate(newMomentDate(work.lastUpdate), true)}</time>
            </div>
            </div>
        </Link>
    }

    render() {
        const { workspaces } = this.state;
        return (<>
            <h2 className={'header-2 header-indent'}>Workspaces</h2>
            <section className={styles.Workspaces} ref={this.slider}>
                {workspaces?.map((ws) => this.getWorkspaceTile(ws))}
            </section>
        </>);
    }
}

export default WorkspacesSlider;