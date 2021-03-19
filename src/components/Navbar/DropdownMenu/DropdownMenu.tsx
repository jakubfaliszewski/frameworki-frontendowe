import { FaBuilding, FaCrown, FaFileContract, FaRegBuilding, FaUserLock } from 'react-icons/fa';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import React, { Component, ReactElement, RefObject } from 'react';

import { BiBook } from 'react-icons/bi';
import { BsPeople } from 'react-icons/bs';
import Button from '../../common/Button/Button';
import { FiLogOut } from 'react-icons/fi';
import { IUser } from '../../../utils/Rest';
import { ImHome } from 'react-icons/im';
import Img from '../../common/Img/Img';
import { IoNewspaperOutline } from 'react-icons/io5';
import { MdArrowDropDown } from 'react-icons/md';
import RestService from '../../../utils/RestService';
import { RiUserSettingsFill } from 'react-icons/ri';
import Search from '../../common/Search/Search';
import { VscQuestion } from 'react-icons/vsc';
import cx from 'classnames';
import styles from "./DropdownMenu.module.scss";

interface IMenuItem {
    title: string,
    items: {
        name: string,
        description?: string,
        icon: ReactElement,
        route: string
    }[]
}

type S = {
    isListOpen: boolean,
    profile?: IUser,
    searchValue: string
}

class DropdownMenu extends Component<RouteComponentProps, S> {
    ripple: RefObject<HTMLSpanElement> = React.createRef();

    constructor(props: RouteComponentProps) {
        super(props);
        this.state = {
            isListOpen: false,
            profile: undefined,
            searchValue: ''
        }

        this.onClick = this.onClick.bind(this);
        this.closeDropdown = this.closeDropdown.bind(this);
        this.changeSearch = this.changeSearch.bind(this);
    }

    componentDidMount() {
        const service = new RestService();
        service.getUserProfile(1).then(profile => {
            this.setState({
                profile: profile
            })
        });
    }

    changeSearch(val: string) {
        this.setState({
            searchValue: val
        })
    }

    onClick(ev: React.MouseEvent) {
        const button = ev.currentTarget as HTMLButtonElement;
        const ripple = this.ripple.current;
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        const radius = diameter / 2;
        if (ripple) {
            ripple.style.width = ripple.style.height = `${diameter}px`;
            ripple.style.left = `${ev.clientX - button.offsetLeft - radius}px`;
            ripple.style.top = `${ev.clientY - button.offsetTop - radius}px`;
            ripple.className = styles.ripple;
            button.appendChild(ripple);
        }
        const newState = {
            isListOpen: !this.state.isListOpen
        }
        this.setState(newState);
    }

    closeDropdown() {
        this.setState({
            isListOpen: false
        });
    }

    getMenuItem(item: IMenuItem['items'][0] | null, disabled = false) {
        if (item) {
            const Icon = item.icon;

            return <Link key={`item_${item.name}`} className={cx(disabled ? styles.disabled : null, styles.DropdownMenuItem)} to={disabled ? '#' : item.route} onClick={this.closeDropdown}>
                {Icon}
                <div>
                    <span>{item.name}</span>
                    {item.description && <span className={styles.DropdownMenuItemDesc}>{item.description}</span>}
                </div>
            </Link>;
        }
    }

    filterEntities(items: IMenuItem[]) {
        let itemsFilterd = [...items];
        if (this.state.searchValue !== '') {
            const filterString = this.state.searchValue.toLowerCase();
            itemsFilterd = itemsFilterd.map((element) => {
                return { ...element, items: element.items.filter((ele) => ele.name.toLowerCase().includes(filterString)) }
            })
        }

        return itemsFilterd;
    }

    render() {
        const menuItems: IMenuItem[] = [{
            title: "Platform",
            items: [{
                name: 'Home',
                icon: <ImHome />,
                route: '/'
            }, {
                name: 'Publications',
                icon: <IoNewspaperOutline />,
                route: '/publications'
            }, {
                name: 'People',
                icon: <BsPeople />,
                route: '/people'
            }, {
                name: 'Entities',
                icon: <FaRegBuilding />,
                route: '/entities'
            }, {
                name: 'Administration',
                icon: <FaCrown />,
                route: '/admin'
            }]
        }, {
            title: "Workspaces",
            items: [{
                name: 'Client contract',
                icon: <FaFileContract />,
                route: '/clientcontract'
            }, {
                name: 'Supplier contract',
                icon: <FaFileContract />,
                route: '/supplier'
            }, {
                name: 'Corporate',
                icon: <FaBuilding />,
                route: '/corpo'
            }, {
                name: 'Group norms',
                icon: <BiBook />,
                route: '/groupnorms'
            }, {
                name: 'Real Estate contracts',
                icon: <FaFileContract />,
                route: '/realestate'
            }]
        }];
        const accountItems = {
            title: "Account",
            items: [{
                name: this.state.profile?.name || '',
                description: 'See profile',
                icon: <Img className={styles.DropdownMenuUserPhoto} src={this.state.profile?.photo?.thumbnailUrl} />,
                route: '/profile/1'
            }, {
                name: 'Privacy',
                icon: <FaUserLock />,
                route: '/privacy'
            }, {
                name: 'Settings',
                icon: <RiUserSettingsFill />,
                route: '/settings'
            }]
        };

        const items = this.filterEntities(menuItems).map((item, i) => <>
            <h4 key={`menuOpt_h_${i}`} className="header-4">{item.title}</h4>
            <div key={`menuOpt_${i}`} className={styles.DropdownMenuItemsSection}>
                {item.items.length
                    ? item.items.map((el) => this.getMenuItem(el))
                    : <p className="header-4 header-indent">No matches</p>
                }
            </div></>);

        const accItem = <>
            <h4 className="header-4">{accountItems.title}</h4>
            <div key={`menuOpt_acc`} className={styles.DropdownMenuItemsSection}>
                {accountItems.items.map((el) => this.getMenuItem(el))}
            </div>
        </>;

        const activeItem = [...menuItems, accountItems].map(v => v.items).flat().find(v => v.route === this.props.location.pathname) || {
            name: 'Unknown',
            icon: <VscQuestion />,
            route: '/404'
        };

        return (
            <div className={cx(styles.DropdownMenuContainer)} >
                <button type="button" className={cx(styles.DropdownMenu, this.state.isListOpen ? styles.open : null)} onClick={(ev) => this.onClick(ev)}>
                    {this.getMenuItem(activeItem, true)} <MdArrowDropDown />
                    <span ref={this.ripple} className={styles.ripple}></span>
                </button>
                {this.state.isListOpen &&
                    <div className={styles.DropdownMenuValues} >
                        <Search customClass={styles.DropdownMenuSearch} placeholder="Filter..." onChange={this.changeSearch} />
                        <div className={styles.DropdownMenuValuesContainer}>
                            {items}
                        </div>
                        <hr />
                        {accItem}
                        <hr />
                        <Button className={styles.DropdownMenuLogout} label="Logout" icon={FiLogOut} onClick={() => {
                            this.props.history.push('/404');
                            this.closeDropdown()
                        }} />
                    </div>
                }
            </div>
        );
    }
}

export default withRouter(DropdownMenu);
