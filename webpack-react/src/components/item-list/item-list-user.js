import React, { Component } from 'react';
import Spinner from '../spinner';
import Items from './items';
import UserInfo from '../user-info';
import Comments from '../comment';
import { Tabs, useTabState, usePanelState } from "@bumaga/tabs";
import { Link } from 'react-router-dom';

import './item-list.css';

export default class ItemListUser extends Component {

  state = {
    data: null,
    loading: true,
    ErrorServer: false
  };

  componentDidMount() {
    this.updateItem();
  } 

  updateItem() {
    const { itemId, getData } = this.props;
    if (!itemId) {
      return;
    }
    getData(itemId)
      .then((item) => {

        this.setState({
          data: item,
          loading: false,
        });
      }); 
  };

  render() {

    const { data, loading } = this.state;
    const { UserId, isLoggedIn } = this.props;

    const cn = (...args) => args.filter(Boolean).join(' ')
    
    const Tab = ({ children }) => {
      const { isActive, onClick } = useTabState()
    
      return <div className={cn('tabs-menu__item', isActive && 'active')} onClick={onClick}>{children}</div>;
    };
    
    const Panel = ({ children }) => {
      const isActive = usePanelState();
      return isActive ? <p>{children}</p> : null;
    };

    if (loading) {
      return <Spinner />;
    }

    return (
      <div className="item-details">
        <UserInfo isLoggedIn={isLoggedIn} UserId={UserId} UserProfile={data} />


        <Tabs>
          <div className="tabs">
            <Tab>articles <span className="count">{data.article_user.length}</span></Tab>
            <Tab>comments <span className="count">{data.comment_user.length}</span></Tab>
          </div>

          <Panel>
            <ul className="item-list list-group">
              <Items data={data.article_user} />
            </ul>
          </Panel>
          <Panel>
            <div className="comment">
              <Comments data={data.comment_user} />
            </div>
          </Panel>
        </Tabs>

      </div>
    );
  };
};

ItemListUser.defaultProps = {
  onItemSelected: () => {}
};

// ItemListUser.propTypes = {
//   onItemSelected: propTypes.func,
//   data: propTypes.arrayOf(propTypes.object).isRequired,
//   children: propTypes.func.isRequired
// };


// export default ItemListUser;