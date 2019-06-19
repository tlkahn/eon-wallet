import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./DappStore.css";
import axios from 'axios'
import AppSet from '../AppSet'
import {
    Page,
    Card
} from 'react-onsenui';
import {API_URL} from '../../config/constants';

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
        this.state = {
            editors_choices: []
        }
    }

    componentDidMount() {
        this.getData();
        this.getEditorsChoicesData();
    }

    getData = () => {
        return axios.get(`${API_URL}/app_items.json`).then(response => {
            this.setState(prevState => {
                let appsets = response.data.map(appset => {
                    return {
                        coverimg: appset.coverimg,
                        name: appset.name,
                        subtitle: appset.subtitle,
                        category_id: appset.category_id,
                        category_name: appset.category_name,
                        url: appset.url
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

    getEditorsChoicesData = () => {
        return axios.get(`${API_URL}/editors_choices.json`).then(response => {
            this.setState(prevState => {
                return { ...prevState, editors_choices: response.data};
            });
        });
    };

    render() {
        if (typeof this.state.appSetsByCategory != 'undefined') {
            return (
            <Page>
            <div className="app-set-container">
                <div className="app-set-title"><h2><b>Editors' Choice</b></h2></div>
                <div className="app-set">
                    <div className="sliderContainer">
                        <Slider {...this.sliderSettings}>
                            {
                                this.state.editors_choices && this.state.editors_choices.map((editors_choice, idx)=>{
                                    return (
                                        <Card key={"card-"+idx}>
                                            <div className="img-holder">
                                                <img src={editors_choice.photo} alt=""/>
                                            </div>
                                            <div className="app-item-title">
                                                <h3>{editors_choice.description}</h3></div>
                                        </Card>
                                    )
                                })
                            }
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
        )}
        else {
            return "";
        }
    }

}