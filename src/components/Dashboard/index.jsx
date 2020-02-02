import React, { useCallback, useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Slide from '@material-ui/core/Slide';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import BooksContext from '../../api/books/context/context';
import ReviewsContext from '../../api/reviews/context/context';
import GenresContext from '../../api/genres/context/context';
import AuthGenresContext from '../../api/auth/context/context';
import List from '../List';
import styles from './styles.css';

// eslint-disable-next-line
const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

function Dashboard() {
    const [selectedGenre, setSelectedGenre] = useState('');
    const [isReview, setIsReview] = useState(false);
    const [review, setReview] = useState('');
    const [selectedReview, setSelectedReview] = useState({});

    const handleToggleIsReview = useCallback(() => {
        setIsReview(!isReview);
    }, [isReview]);

    const auth = React.useContext(AuthGenresContext);
    const books = React.useContext(BooksContext);
    const reviews = React.useContext(ReviewsContext);
    const genres = React.useContext(GenresContext);

    useEffect(() => {
        genres.fetch()
            .then((data) => {
                setSelectedGenre(data[0].name);
                books.fetch({
                    genreId: data[0]._id
                });
            });
    }, []);

    const handlePostReview = React.useCallback(() => {
        reviews.create({
            description: review,
            book: selectedReview._id,
            user: auth.user
        })
            .then(handleToggleIsReview)
            .catch(handleToggleIsReview);
    }, [review]);

    const handleChange = React.useCallback((e) => {
        setReview(e.target.value);
    }, []);
    const handleChangeGenre = React.useCallback(
        (e) => {
            setSelectedGenre(e.target.value);
            books.fetch({
                genreId: genres.data.find((v) => v.name === e.target.value)._id
            });
        },
        [genres]
    );

    return (
        <div className={styles.base}>
            <Typography variant="h4" gutterBottom color="primary">
                Books
            </Typography>
            <div>
                <TextField
                    select
                    label="Genre"
                    value={selectedGenre}
                    helperText="Please select Genre"
                    variant="filled"
                    onChange={handleChangeGenre}
                >
                    {genres.data.map((option) => (
                        <MenuItem key={option.name} value={option.name}>
                            {option.name}
                        </MenuItem>
                    ))}
                </TextField>
            </div>
            <br />
            <List
                loading={books.loading}
                data={books.data}
                setSelectedReview={setSelectedReview}
                handleReview={handleToggleIsReview}
            />
            <Dialog
                open={isReview}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleToggleIsReview}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">
                    {/* eslint-disable-next-line */}
                    Write review for {selectedReview.name}
                </DialogTitle>
                <DialogContent>
                    <TextField fullWidth multiline rows={5} onChange={handleChange} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleToggleIsReview} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handlePostReview} color="primary" disabled={!review}>
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default Dashboard;
