import React from 'react';
import AvatarPlaceholder from '../../assets/avatar.png';
import {Link} from 'react-router-dom';

const UserInfo = ({photoUrl, name, id}) => {
    const image = photoUrl || AvatarPlaceholder;
    return (
        <Link to={`/user/${id}`}>
            <img alt={name} className="roundedImg" src={image}></img>
            <span className="userName">{name}</span>
        </Link>
    );
};

export default UserInfo;
