import React, { Component } from 'react';
import {connect} from 'react-redux';

import './delete-confirm.css';
import {API_BASE_URL} from '../../config';
import LoadingGif from '../../images/loading.gif';

import {setManageLoading,
        setRecipeData,
        setConfirmDeletePopup,
        setDeleteLoading} from '../../actions/manage-recipes';

export class DeleteConfirm extends Component {

  getRecipeDatabase() {
    this.props.dispatch(setManageLoading(true));
    fetch(`${API_BASE_URL}/newrecipes`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      return res.json();
    })
    .then(recipeData => {
      this.props.dispatch(setRecipeData(recipeData));
      return this.props.dispatch(setManageLoading(false));
    })
    .catch((err) => {
      this.props.dispatch(setManageLoading(false));
      return alert(err);
    });
  }

  deleteRecipe() {
    this.setDeleteLoading(true);
    fetch(`${API_BASE_URL}/newrecipes/delete`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.props.authToken}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "id": this.props.deleteRecipeID,
        "username": this.props.currentUser,
      })
    })
    .then(res => {
      return res.json();
    })
    .then(json => {
      alert('Recipe Deleted!');
      this.hideDeleteConfirmation();
      this.setDeleteLoading(false);
      return this.getRecipeDatabase();
    })
    .catch((err) => {
      this.hideDeleteConfirmation();
      this.setDeleteLoading(false);
      return alert(err);
    });
  }

  hideDeleteConfirmation() {
    this.props.dispatch(setConfirmDeletePopup(false));
  }

  setDeleteLoading(boolean) {
    this.props.dispatch(setDeleteLoading(boolean));
  }

  render() {
    return (
      <div className="delete-popup">
        <div className="delete-popup-inner">
          <span className="delete-confirm-popup-text">Are you sure you want to delete this?</span>
          <button className="delete-confirm-cancel-button"
            onClick={this.hideDeleteConfirmation.bind(this)}>Cancel</button>
          <div>
            {this.props.deleteLoading ? 
              <img className="delete-loading" src={LoadingGif} alt={'loading gif'} /> :
              <button className="delete-confirm-delete-button"
              onClick={this.deleteRecipe.bind(this)}>Delete</button>
              }
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.auth.currentUser,
  authToken: state.auth.authToken,
  deleteRecipeID: state.manageRecipes.deleteRecipeID,
  deleteLoading: state.manageRecipes.deleteLoading
});

export default connect(mapStateToProps)(DeleteConfirm);