import React from 'react';

import {
    Page,
    BackButton
} from 'react-onsenui';

export default class Setting extends React.Component {

    render() {
        return (
            <Page>
                <div>
                    <BackButton>
                        Press me
                    </BackButton>
                </div>
            </Page>

        )
    }
}