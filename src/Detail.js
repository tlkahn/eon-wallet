import React from 'react';

import ons from 'onsenui';

import {
    Page,
    Toolbar,
    Button
} from 'react-onsenui';
import BackButton from "react-onsenui/src/components/BackButton";

export default class Detail extends React.Component {
    render() {
        return (
            <Page>
            <Toolbar>
                <div className='center'>Detail</div>
                <BackButton>Back</BackButton>
            </Toolbar>
            </Page>

        )
    }

}