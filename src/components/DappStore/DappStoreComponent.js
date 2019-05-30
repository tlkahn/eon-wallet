import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./DappStore.css";
import axios from 'axios'
import {BACKEND_URL} from '../../../package.json';
import AppSet from '../AppSet'
import {
    Page,
    Card
} from 'react-onsenui';
let groupBy = function(xs, key) {
  return xs.reduce(function(rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};

export default class DappStoreComponent extends React.Component {
    constructor (props) {
        super(props);
        this.sliderSettings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false
        };
        this.state = {}
    }

    componentDidMount() {
        this.getData();
    }

    getData = () => {
        return axios.get(BACKEND_URL.test).then(response => {
            this.setState(prevState => {
                let appsets = response.data.map(appset => {
                    return {
                        coverimg: appset.coverimg,
                        name: appset.name,
                        subtitle: appset.subtitle,
                        category_id: appset.category_id,
                        category_name: appset.category_name
                    };
                });
                let appSetsByCategory = {};
                if (typeof appsets != 'undefined') {
                    appSetsByCategory = groupBy(appsets, 'category_name');
                }
                return { ...prevState, appsets, appSetsByCategory };
            });
        });
    };

    render() {
        if (typeof this.state.appSetsByCategory != 'undefined') {
            return <Page>
            <div className="app-set-container">
                <div className="app-set-title"><h2>Editors' Choice</h2></div>
                <div className="app-set">
                    <div className="sliderContainer">
                        <Slider {...this.sliderSettings}>
                            <Card>
                                <div className="img-holder">
                                    <img src="https://source.unsplash.com/random/200x200" alt=""/>
                                </div>
                                <div className="app-item-title"><h3>Get stablecoin using idle cryptos</h3></div>
                            </Card>
                            <Card>

                                <div className="img-holder">
                                    <img src="https://source.unsplash.com/random/200x200" alt=""/>
                                </div>
                                <div className="app-item-title"><h3>Get stablecoin using idle cryptos</h3></div>
                            </Card>
                            <Card>

                                <div className="img-holder">
                                    <img src="https://source.unsplash.com/random/200x200" alt=""/>
                                </div>
                                <div className="app-item-title"><h3>Get stablecoin using idle cryptos</h3></div>
                            </Card>
                        </Slider>
                    </div>
                </div>
            </div>
            {
                Object.keys(this.state.appSetsByCategory).map((category_name, index )=> {
                return <AppSet
                    category_name={category_name}
                    data={this.state.appSetsByCategory[category_name]}
                    key={'app-set-category'+category_name}
                    navigator={this.props.navigator}
                    index = {index}
                />
            })}
        </Page>
        }
        else {
            return "";
        }
    }

}