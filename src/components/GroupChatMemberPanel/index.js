import React from 'react';
import './GroupChatMemberPanel.css';
import fetchUsrInfo from '../../services/fetchUsrInfo';
import {Page} from 'react-onsenui';

export default class GroupChatMemberPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        usrInfo: []
    }
  }

  componentWillReceiveProps(nextProps, nextContext) {
      this.getUsrInfo();
  }

    getUsrInfo() {
      ((memberIds)=>{
          let ps = Promise.all(memberIds.map(mid=>{
              return fetchUsrInfo(mid);
          }));
          ps.then(results=>{
              this.setState({
                  usrInfo: results
              })
          })
      })(this.props.memberIds)
  }

    render() {
        console.log(this.state);
        return (
            <div>
                {
                    this.state.usrInfo.length > 0 ? this.state.usrInfo.map(obj=>{
                        return (
                            <span>
                                <img className="conversation-photo" src={obj.photo} alt="conversation" />
                            </span>
                        )
                    }) : ""
                }
            </div>
        )
    }
}