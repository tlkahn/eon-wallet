import React from 'react';
import HorizontalScroller from 'react-horizontal-scroll-container';
import AppItem from '../AppItem';
import './AppSet.css'

export default class Appset extends React.Component {
    render() {
        if (typeof this.props.data != 'undefined') {
            return (
                <div className="app-set-container">
                    <div className="horizontal-scroller-tool-bar">
                        <div>
                            <div className="left">
                                <h3>{this.props.category_name}</h3>
                            </div>
                            <div className='right'>
                                <h3>See all</h3>
                            </div>
                        </div>
                    </div>
                    <div className="horizontal-scroller-container">
                        <HorizontalScroller>
                            {
                                this.props.data.map((app, index) => {
                                    return <AppItem name={app.name} subtitle={app.subtitle} coverimg={app.coverimg} key={app.name}/>
                                })
                            }
                        </HorizontalScroller>
                    </div>
                </div>)
        }
        else
            return "";

    }
}


