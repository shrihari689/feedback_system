import React, { useState } from 'react';
import Loader from './../general/loadingPage';

const AdminManageUsersItem = ({role, index, isLoading, onRoleDelete, onRoleSave}) => {
    
    const [isChanged, setIsChanged] = useState(false);
    const [users, setUsers] = useState(role.users);
    const [name, setName] = useState(role.name);
    const {roleId} = role;

    const handleAddNewUser = () => {
        if(users.length < 3)
        {
            setUsers((prev) => [...prev, '']);
            setIsChanged(true);
        }
    };

    const handleSaveRole = () => {
        if(name === ''){
            alert('Enter a Name!');
        }
        else if(users.length === 0){
            alert('Add at least one user!');
        }
        else if(users.length > 3){
            alert('Only Maximum of 3 users are allowed!');
        }
        else if(isChanged) {
            onRoleSave(roleId, {name, users }, index);
        }
    }

    const handleRemoveUser = (index) => {
        setUsers((prev) => prev.filter((e,i) => index !== i));
        setIsChanged(true);
    };

    if(isLoading.includes(index)) {
        return <div className="adminManageUsers__loader"><Loader /></div>;
    }

    return ( 
        <div className="adminManageUsers__usersList__item">
            <div className="adminManageUsers__usersList__item__role">
                <div><h5>Tag Name</h5></div>
                <input
                    onChange={
                        (event) => {
                            const newValue = event.target.value.trim();
                            if(newValue !== name){
                                setName(newValue);
                                setIsChanged(true);    
                            }
                        }
                    }
                    type="text"
                    placeholder="Eg. Transport"
                    value={name}
                />
                <div className="role__buttons">
                    <div
                        className={"button green" + (!isChanged ? " disabled":'')}
                        onClick={handleSaveRole}
                    >Save</div>
                    <div className="button" onClick={() => onRoleDelete(roleId, index)}>Delete</div>
                </div>
            </div>
            <div className="adminManageUsers__usersList__item__emails">
                <div><h5>Users (Max. of 3)</h5></div>
                {
                    users.map((email, i) => {
                        return (
                            <div key={i}>
                                <input
                                    className={email.endsWith('@bitsathy.ac.in') ? 'ok': 'notok'}
                                    onChange={(event) => {
                                        const {value} = event.target;
                                        const newEmails = [...users];
                                        newEmails[i] = value.trim().toLowerCase();
                                        setUsers(newEmails);
                                        setIsChanged(true);
                                    }}
                                    type="email"
                                    placeholder="someone@bitsathy.ac.in"
                                    value={email} disabled={email.endsWith('@bitsathy.ac.in')} />
                                <i onClick={() => handleRemoveUser(i)} className="fa fa-trash"></i>
                            </div>
                        );
                    })
                }
                {
                    users.length < 3 ?
                    <div className="button" onClick={handleAddNewUser}>Add Member</div> : null 
                }
            </div>
        </div>
    );
}
 
export default AdminManageUsersItem;