import React from 'react';
import {
    List,
    ListItem,
    ListHeader,
    Page,
    BackButton,
    Toolbar,
} from 'react-onsenui';
import Setting from '../../Setting';
import './DappList.css'
import DappWrapper from '../DappWrapper'

export default class DappList extends React.Component {
    gotoComponent(component, key, name, url) {
        this.props.navigator.pushPage({comp: component, props: { key, name, url }});
    }
    render() {
        return (
            <Page>
                <Toolbar>
                    <div className="left">
                        <BackButton>Back</BackButton>
                    </div>
                </Toolbar>
                <div className="dapp-list-container">
                    <List
                        // renderHeader={() => <ListHeader>Components</ListHeader>}
                        dataSource={this.props.data}
                        renderRow={(row, idx) =>
                            <ListItem key={"dapp-" + idx} tappable onClick={()=>{this.gotoComponent(DappWrapper, "dapp-wrapper", this.props.data[idx].name, this.props.data[idx].url)}} modifier="chevron">
                                <div className="left">
                                    <img className="list-item__thumbnail" src={this.props.data[idx].coverimg||""} />
                                </div>
                                <div className="center">
                                    <span className="list-item__title">{this.props.data[idx].name||""}</span><span className="list-item__subtitle">{this.props.data[idx].subtitle||""}</span>
                                </div>
                            </ListItem>
                        }
                    />
                </div>
            </Page>
        )
    }
}
