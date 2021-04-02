import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import ProfileItem from './ProfileItem';
import { getProfiles } from '../../actions/profile';

const Profiles = ({ getProfiles, profile: { profiles, loading } }) => {
  useEffect(() => {
    getProfiles();
  }, [getProfiles]);

  const [data, setData] = useState({ search: "", duration: "", length: "", interest: "", amount: "" });

  const { search, duration, length, interest, amount } = data;

  const onChange = e => {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  const onSubmit = e => {
    e.preventDefault();
    getProfiles(search);
  }

  const searchFilter = e => {
    e.preventDefault();
    getProfiles('', duration, length, interest, amount)
  }

  function myFunction() {
    document.getElementById("lendersFilter").classList.toggle("show");
    document.querySelector('.fa-caret-down').classList.toggle('turn_left');
  }

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <form className="floatright my-bot" onSubmit={onSubmit}>
            <input 
              type="text" 
              placeholder="Search..." 
              name="search"
              value={search}
              onChange={onChange}
              className="sinput"
            />
            <button className="sbtn btn-primary" type="submit">
              <i className="fa fa-search"></i>
            </button>
          </form> 
          <h1 className='large text-primary clear'>Lenders</h1>
            <p className='lead clear'>
              <i className='far fa-money-bill-alt' /> Browse and find a lender
              that meets your criteria
              <button className="sbtn fbtn floatright" onClick={myFunction}><i className="fa fa-caret-down" style={{fontSize: "30px"}}></i></button>
            </p>
          <form className="my-bot floatright filter-display" id="lendersFilter" onSubmit={searchFilter}>
            <span className="my-ryt">
            N<input type="number" list="amount" name="amount" className="finput" value={amount} onChange={onChange}/>
            <datalist id="amount">
              <option value="1000"/>
              <option value="5000"/>
              <option value="10000"/>
              <option value="20000"/>
            </datalist>
            </span>
            <span className="my-ryt">
              <input type="number" list="interest" name="interest" className="finput" value={interest} onChange={onChange}/>%
              <datalist id="interest">
                <option value="1"/>
                <option value="2"/>
                <option value="5"/>
                <option value="10"/>
                <option value="20"/>
              </datalist>
            </span>
            <span className="my-ryt">
              <input type="number" list="duration" name="duration" className="finput" value={duration} onChange={onChange}/>
              <datalist id="duration">
                <option value="1"/>
                <option value="2"/>
                <option value="5"/>
                <option value="10"/>
              </datalist>
              <select id="slength" name="length" onChange={onChange}>
                <option value="days">Day(s)</option>
                <option value="weeks">Week(s)</option>
                <option value="months">Month(s)</option>
                <option value="years">Year(s)</option>
              </select>
              <button className="sbtn fbtn" type="submit"><i className="fa fa-filter"></i></button>
            </span>
          </form>
          <div className='profiles clear'>
            {profiles.length > 0 ? (
              profiles.map(profile => (
                <ProfileItem key={profile._id} profile={profile} />
              ))
            ) : (
              <h4>No lenders found...</h4>
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getProfiles }
)(Profiles);