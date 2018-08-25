import React from 'react';
import AvatarPlaceholder from '../../assets/avatar.png';

const UserInfo = ({photoUrl, name}) => {
    const image = photoUrl || AvatarPlaceholder;
    return (
        <div>
            <img className="roundedImg" src={image}></img>
            <span className="userName">{name}</span>
        </div>
    );
};

export default UserInfo;