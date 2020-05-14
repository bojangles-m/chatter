import React from 'react';

import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export const AddBook = ({ book, onChange, onClear, onSubmit }) => (
    <div>
        <h2>Enter New Book</h2>
        <Form onSubmit={onSubmit}>
            <Form.Row>
                <Form.Group as={Col}>
                    <Form.Label>Title: </Form.Label>
                    <Form.Control
                        type="text"
                        name="title"
                        value={book.title}
                        onChange={onChange}
                        placeholder="Enter Title"
                    />
                </Form.Group>
                <Form.Group as={Col}>
                    <Form.Label>Author: </Form.Label>
                    <Form.Control
                        type="text"
                        name="author"
                        value={book.author}
                        onChange={onChange}
                        placeholder="Enter Author"
                    />
                </Form.Group>
            </Form.Row>

            <div className="form-line"></div>

            <Button type="submit">Save</Button>
            <Button onClick={onClear}>Clear</Button>
        </Form>
    </div>
);

export const BooksTable = ({ books, onRemove, onEdit }) => {
    return books.length ? (
        <table>
            <BooksHead />
            <BooksData books={books} onRemove={onRemove} onEdit={onEdit} />
        </table>
    ) : (
        <div>Books not available!!!!</div>
    );
};

const BooksHead = () => (
    <thead className="thead-light">
        <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Author</th>
            <th></th>
            <th></th>
        </tr>
    </thead>
);

const BooksData = (props) => (
    <tbody>
        {props.books.map((currentBook, i) => (
            <tr key={i}>
                <td>{currentBook._id}</td>
                <td>{currentBook.title}</td>
                <td>{currentBook.author}</td>
                <td>
                    <Button onClick={(e) => props.onEdit(i)}>Edit</Button>
                </td>
                <td>
                    <Button onClick={(e) => props.onRemove(currentBook._id, i)}>Delete</Button>
                </td>
            </tr>
        ))}
    </tbody>
);
