import React from 'react';
import AvatarPlaceholder from '../../assets/avatar.png';

const UserInfo = ({photoUrl, name}) => {
    const image = photoUrl || AvatarPlaceholder;
    return (
        <span>
            <img alt={name} className="roundedImg" src={image}></img>
            <span className="userName">{name}</span>
        </span>
    );
};

export default UserInfo;