import React, { useRef } from 'react';

const TodoItem = ({
  item,
  isEditing,
  onEditClick,
  onCancelClick,
  onSaveClick,
}) => {
  const titleInput = useRef(null);
  return (
    <li className='list-group-item'>
      {isEditing ? (
        <>
          <input
            type='text'
            ref={titleInput}
            name='title'
            defaultValue={item.title}
          />
          <button
            type='button'
            className='btn btn-sm:hover btn-primary m-1'
            onClick={() =>
              onSaveClick(item.id, { title: titleInput.current.value })
            }
          >
            Save
          </button>
          <button
            type='button'
            className='btn btn-sm:hover btn-danger m-1'
            onClick={onCancelClick}
          >
            Cancel
          </button>
        </>
      ) : (
        <>
          <span>{item.title}</span>
          <button
            type='button'
            className='btn btn-sm:hover btn-primary m-1'
            onClick={onEditClick}
          >
            Edit
          </button>
        </>
      )}
    </li>
  );
};

export default TodoItem;
