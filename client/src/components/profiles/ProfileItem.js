import React from 'react';
import PropTypes from 'prop-types';

const ProfileItem = ({
  profile: {
    name,
    phone,
    companyEmail,
    website,
    description,
    interestRate,
    duration,
    maxAmount
  }
}) => {
  if((duration % 365) === 0){
    duration = String(duration/365) + ' year(s)'
  } else if((duration % 31) === 0){
    duration = String(duration/31) + ' month(s)'
  } else if((duration % 7) === 0){
    duration = String(duration/7) + ' week(s)'
  } else if(duration){
    duration = String(duration) + ' day(s)'
  };
  let res = String(maxAmount);
  let arr = [];
  for(let i=0; i < (res.length)/3; i++){
    arr.push(
      res.slice((-3 * (i + 1)), (res.length- (3 * i)))
    );
  };
  maxAmount = arr.reverse().join();

  return (
    <div className='profile bg-light'>
      <img src={`/api/auth/${name}/image`} alt='' className='round-img img-item' />
      <div>
        <h2>Name: {name} </h2>
        <p className='my-1'><b>Duration:</b> {duration && <span> {duration} </span>} </p>
        <p className='my-1'><b>Interest Rate:</b> {interestRate && <span>  {interestRate}% </span>} </p>
        <p className='my-1'><b>Company Email:</b> {companyEmail && <span>{companyEmail}</span>} </p>
        <p className='my-1'><b>Phone:</b> {phone && <span>{phone}</span>} </p>
        <p className='my-1'><b>Max Amount:</b> {maxAmount && <span> N{maxAmount} </span>} </p>
        <p className='my-1'><b>Description:</b> {description && <span>{description}</span>} </p>
        <a href={website} className='btn btn-primary'>
          Visit Website
        </a>
      </div>
    </div>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileItem;
