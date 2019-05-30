import React from 'react';
import ReactDOM from 'react-dom';
import {
    Page,
    BackButton,
    ToolbarButton,
    Toolbar
} from 'react-onsenui';
import "./DappWrapper.css"

class Frame extends React.Component {
  componentDidMount() {
    this.iframeHead = this.node.contentDocument.head
    this.iframeRoot = this.node.contentDocument.body
    this.forceUpdate()
  }

  render() {
    const { children, head, ...rest } = this.props
    return (

      <iframe {...rest} ref={node => (this.node = node)}>
        {this.iframeHead && ReactDOM.createPortal(head, this.iframeHead)}
        {this.iframeRoot && ReactDOM.createPortal(children, this.iframeRoot)}
      </iframe>
    )
  }
}


export default class DappWrapper extends React.Component {
    render() {
        return (
            <Page>
                <Toolbar>
                    <div className='center'>
                        {this.props.name}
                    </div>
                    <div className="left">
                        <BackButton/>
                    </div>
                    <div className="right dapp-wrapper-toolbarbutton-more">
                        <ToolbarButton key="dapp-wrapper-toolbarbutton-more" icon="ion-ios-more" />
                    </div>
                </Toolbar>
                {/*<iframe src={this.props.url}> */}
                <div className="frame-wrapper">
                    <Frame src={this.props.url}>
                    </Frame>
                </div>
            </Page>
        )
    }
}


