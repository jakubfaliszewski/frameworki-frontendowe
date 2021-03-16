import React, { Component } from 'react';

import { IComment } from '../../utils/Rest';
import Pagination from '../common/Pagination/Pagination';
import RestService from '../../utils/RestService';
import Search from '../common/Search/Search';
import Skeleton from './../common/Skeleton/Skeleton';
import WorkTile from '../common/WorkTile/WorkTile';
import styles from "./Work.module.scss";

const PAGE_SIZE = 10;
const WORKS_LIMIT = 200;

type S = {
    works: Array<IComment> | null,
    currentPage: number,
    searchValue: string
}

class Work extends Component<{}, S> {

    service;

    constructor(props: {}) {
        super(props);
        this.service = new RestService();
        this.state = {
            works: null,
            searchValue: '',
            currentPage: 0
        }

        this.changePage = this.changePage.bind(this);
        this.changeSearch = this.changeSearch.bind(this);
    }

    componentDidMount() {
        this.getWorksFromApi();
    }

    getWorksFromApi() {
        this.service.getWork(WORKS_LIMIT).then(works => {
            this.setState({
                works: works
            })
        });
    }

    changePage(index: number) {
        this.setState({
            currentPage: index
        })
    }

    changeSearch(val: string) {
        this.setState({
            searchValue: val
        })
    }

    filterRows(works: IComment[]): IComment[] {
        if (this.state.searchValue !== '') {
            const filterString = this.state.searchValue.toLowerCase();

            return works.filter(v => v.name.toLowerCase().includes(filterString));
        }

        return works;
    }

    getWorks(filteredWorks: IComment[]) {
        const range = this.state.currentPage * PAGE_SIZE;

        return (this.state.works && filteredWorks.length > 0
            ? filteredWorks.slice(range, range + PAGE_SIZE).map((work, i) =>
                <WorkTile key={`work_${work.id}`} work={work} />)
            : !this.state.works && filteredWorks.length === 0
                ? <Skeleton type="work" count={10} />
                : <h4 className={'header-2 header-indent'}>No matches</h4>);
    }

    render() {
        const { works, currentPage } = this.state;
        const filteredWorks = this.filterRows(this.state.works ? [...this.state.works] : []);

        return (
            <section className={styles.Work}>
                <div className={styles.WorkHeader}>
                    <h2 className={'header-2 header-indent'}>Resume your work</h2>
                    <div className={styles.WorkHeaderActions}>
                        <Search placeholder="Filter by title..." onChange={this.changeSearch} />
                    </div>
                </div>
                <div className={styles.WorkContainer}>
                    {this.getWorks(filteredWorks)}
                </div>
                <div className={styles.Pagination}>
                    {(works && filteredWorks.length > 0) && <Pagination itemsCount={filteredWorks.length} pageSize={PAGE_SIZE} currentPage={currentPage} onChange={this.changePage} />}
                </div>
            </section>
        );
    }
}

export default Work;