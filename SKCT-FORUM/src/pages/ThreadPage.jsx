import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Card, CardContent, Button, Box, IconButton, Divider, TextField, Modal, List, ListItem, ListItemText, Avatar, Tooltip } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CommentIcon from '@mui/icons-material/Comment';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { v4 as uuidv4 } from 'uuid'; // For generating unique IDs
import ClearIcon from '@mui/icons-material/Clear'; // Import ClearIcon for delete button

const EnhancedCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  borderRadius: 12,
  boxShadow: theme.shadows[4],
  transition: 'transform 0.3s, box-shadow 0.3s',
  '&:hover': {
    transform: 'scale(1.02)',
    boxShadow: theme.shadows[6],
  },
}));

const ActionButton = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  color: theme.palette.primary.main,
  borderColor: theme.palette.primary.main,
  borderRadius: 20,
  borderWidth: 1,
  marginRight: theme.spacing(1),
  '&:hover': {
    backgroundColor: theme.palette.primary.light,
    borderColor: theme.palette.primary.dark,
  },
}));

const LikeButton = styled(IconButton)(({ theme }) => ({
  padding: theme.spacing(1),
  backgroundColor: 'transparent',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const ModalBox = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  maxWidth: 600,
  backgroundColor: theme.palette.background.paper,
  borderRadius: 12,
  boxShadow: theme.shadows[5],
  padding: theme.spacing(4),
}));

const CommentSection = styled(Box)(({ theme }) => ({
  borderTop: `1px solid ${theme.palette.divider}`,
  paddingTop: theme.spacing(2),
  marginTop: theme.spacing(2),
}));

const FilePreview = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginTop: theme.spacing(2),
  position: 'relative',
}));

const PreviewImage = styled('img')(({ theme }) => ({
  width: '100%',
  borderRadius: 8,
}));

const PreviewVideo = styled('video')(({ theme }) => ({
  width: '100%',
  borderRadius: 8,
}));

const ThreadPage = () => {
  const navigate = useNavigate();
  const [threads, setThreads] = useState([
    { id: 1, title: 'How to learn React?', content: 'I am new to React and would like some advice on the best resources to learn it.', likes: 10, likedByUser: false, comments: [], user: 'Alice', files: [] },
    { id: 2, title: 'Best practices for state management?', content: 'What are the best practices for managing state in large React applications?', likes: 5, likedByUser: false, comments: [], user: 'Bob', files: [] },
  ]);

  const [open, setOpen] = useState(false);
  const [newQuestion, setNewQuestion] = useState({ title: '', content: '' });
  const [selectedThread, setSelectedThread] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  const userId = 'user123'; // Simulate a logged-in user
  const [userLikes, setUserLikes] = useState(() => {
    const savedLikes = localStorage.getItem('userLikes');
    return savedLikes ? JSON.parse(savedLikes) : {};
  });

  useEffect(() => {
    localStorage.setItem('userLikes', JSON.stringify(userLikes));
  }, [userLikes]);

  const handleLike = (id) => {
    setThreads(threads.map(thread => {
      if (thread.id === id) {
        const isLiked = userLikes[id] === true;
        const updatedLikes = isLiked ? thread.likes - 1 : thread.likes + 1;
        return {
          ...thread,
          likes: updatedLikes,
          likedByUser: !isLiked,
        };
      }
      return thread;
    }));
    setUserLikes(prevLikes => ({
      ...prevLikes,
      [id]: !userLikes[id]
    }));
  };

  const handleComment = (id) => {
    setSelectedThread(id);
  };

  const handleAddComment = () => {
    setThreads(threads.map(thread => {
      if (thread.id === selectedThread) {
        return {
          ...thread,
          comments: [...thread.comments, newComment],
        };
      }
      return thread;
    }));
    setNewComment('');
    setSelectedThread(null);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setSelectedFile(null); // Clear selected file on modal close
  };

  const handleChange = (e) => {
    setNewQuestion({ ...newQuestion, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type and size
      const validTypes = ['image/jpeg', 'image/png', 'application/pdf', 'video/mp4'];
      if (validTypes.includes(file.type) && file.size <= 30 * 60 * 1000) { // 30 minutes in milliseconds
        setSelectedFile(file);
      } else {
        alert('Invalid file type or size. Only images, PDFs, and videos up to 30 minutes are allowed.');
      }
    }
  };

  

// const createThread = async (newThread, selectedFile) => {
//   const formData = new FormData();
//   formData.append('thread', JSON.stringify(newThread));
//   if (selectedFile) {
//     formData.append('file', selectedFile);
//   }

//   try {
//     const response = await axios.post('/api/threads', formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//       },
//     });
//     return response.data;
//   } catch (error) {
//     console.error('Error creating thread:', error);
//     throw error;
//   }
// };

// const createThread = async (newThread) => {
//   const formData = new FormData();
//   formData.append('title', newThread.title);
//   formData.append('content', newThread.content);
//   formData.append('user', newThread.user);

//   if (newThread.file) {
//     formData.append('file', newThread.file);
//   }

//   try {
//     const response = await axios.post('http://localhost:8080/api/threads', formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//       },
//     });

//     if (response.status === 200 || response.status === 201) {
//       const createdThread = response.data;
//       setThreads([...threads, createdThread]);
//     } else {
//       console.error('Failed to create thread, status code:', response.status);
//       alert('Failed to create thread, please try again.');
//     }
//   } catch (error) {
//     console.error('Error creating thread:', error.response || error.message);
//     alert('An error occurred while creating the thread.');
//   }
// };


// const createThread = async (newThread, selectedFile) => {
//   const formData = new FormData();
//   formData.append('thread', JSON.stringify(newThread));
//   if (selectedFile) {
//     formData.append('file', selectedFile);
//   }

//   try {
//     const token = localStorage.getItem('token'); // Or wherever you store the token after login
//     const response = await axios.post('http://localhost:8080/api/threads', formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//         // 'Authorization': `Bearer ${token}`, // Add the token to the Authorization header
//         'Authorization': `Bearer ${localStorage.getItem('token')}`,
//       },
//     });
//     return response.data;
//   } catch (error) {
//     console.error('Error creating thread:', error);
//     throw error;
//   }
// };


// import axios from 'axios';

// const createThread = async (newThread, selectedFile) => {
//   // const token = localStorage.getItem('token'); // Retrieve the token

//   // if (!token) {
//   //   console.error('Token is missing');
//   //   return;
//   // }

//   const formData = new FormData();
//   formData.append('thread', JSON.stringify(newThread));
//   if (selectedFile) {
//     formData.append('file', selectedFile);
//   }

//   try {
//     const response = await axios.post('http://localhost:8080/api/threads', formData
//       , {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//         'Authorization': `Bearer ${token}`, 
//       },
//     }
//   );
//     return response.data;
//   } catch (error) {
//     console.error('Error creating thread:', error);
//     throw error;
//   }

// // //   const token = localStorage.getItem('token');
// // // if (token) {
// // //   axios.post('http://localhost:8080/api/threads', formData
// // //     // , {
// // //     // headers: {
// // //     //   // 'Content-Type': 'multipart/form-data',
// // //     //   'Authorization': `Bearer ${token}`,
// // //     // },
// // //   // }
// // // );
// // } else {
// //   console.error('Authorization token is missing.');
// // }

// };

const createThread = async (newThread, selectedFile) => {
  const formData = new FormData();
  formData.append('thread', JSON.stringify(newThread));

  if (selectedFile) {
    formData.append('file', selectedFile);
  }

  try {
    const response = await axios.post('http://localhost:8080/api/threads', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error posting data:', error);
    throw error;
  }
};


const handleSubmit = async () => {
  if (newQuestion.title.trim() === '' || newQuestion.content.trim() === '') {
    alert('Title and content are required.');
    return;
  }

  const newThread = {
    title: newQuestion.title,
    content: newQuestion.content,
    user: 'NewUser', // Default user for new threads
  };

  try {
    const response = await createThread(newThread, selectedFile);
    console.log("Thread created successfully:", response);
    setThreads([...threads, { ...newThread, id: threads.length + 1 }]); // Adjust as needed
    setNewQuestion({ title: '', content: '' });
    setSelectedFile(null);
    handleClose();
  } catch (error) {
    console.error("Error creating thread:", error);
    alert('An error occurred while creating the thread.');
  }
};




  const handleRemoveFile = () => {
    setSelectedFile(null);
  };

  // const handleSubmit = async () => {
  //   if (newQuestion.title.trim() === '' || newQuestion.content.trim() === '') {
  //     alert('Title and content are required.');
  //     return;
  //   }

  //   const newThread = {
  //     id: threads.length + 1,
  //     title: newQuestion.title,
  //     content: newQuestion.content,
  //     likes: 0,
  //     likedByUser: false,
  //     comments: [],
  //     user: 'NewUser', // Default user for new threads
  //     files: selectedFile ? [{ id: uuidv4(), url: URL.createObjectURL(selectedFile), name: selectedFile.name }] : [],
  //   };

    

  //   createThread(newThread)
  //       .then(response => {
  //           // Handle success (e.g., navigate to the thread page or show a success message)
  //           console.log("Thread created successfully:", response);
  //       })
  //       .catch(error => {
  //           // Handle error (e.g., show an error message)
  //           console.error("Error creating thread:", error);
  //       });

  //   setThreads([...threads, newThread]);
  //   setNewQuestion({ title: '', content: '' });
  //   setSelectedFile(null);
  //   handleClose();
  // };

  // const handleSubmit = async () => {
  //   if (newQuestion.title.trim() === '' || newQuestion.content.trim() === '') {
  //     alert('Title and content are required.');
  //     return;
  //   }
  
  //   const newThread = {
  //     title: newQuestion.title,
  //     content: newQuestion.content,
  //     user: 'NewUser', // Default user for new threads
  //     file: selectedFile, // Include the selected file, if any
  //   };
  
  //   await createThread(newThread);
  
  //   // Reset the form and close the modal
  //   setNewQuestion({ title: '', content: '' });
  //   setSelectedFile(null);
  //   handleClose();
  // };
  

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
        Forum Threads
      </Typography>
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleOpen} 
        sx={{ mb: 3, borderRadius: 20, boxShadow: 2, '&:hover': { boxShadow: 4 } }}
      >
        Ask a Question
      </Button>
      {threads.map((thread) => (
        <EnhancedCard key={thread.id}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>{thread.user[0]}</Avatar>
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', color: 'black' }}>
                  {thread.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Posted by {thread.user}
                </Typography>
              </Box>
            </Box>
            <Typography variant="body1" color="text.primary" sx={{ mb: 2 }}>
              {thread.content}
            </Typography>
            {/* {thread.files.length > 0 && (
              <Box sx={{ mb: 2 }}>
                {thread.files.map(file => (
                  <Box key={file.id} sx={{ mb: 1 }}>
                    {file.name.endsWith('.pdf') ? (
                      <a href={file.url} target="_blank" rel="noopener noreferrer">
                        <Typography variant="body2" color="text.primary">{file.name}</Typography>
                      </a>
                    ) : file.name.endsWith('.mp4') ? (
                      <PreviewVideo controls src={file.url} />
                    ) : (
                      <PreviewImage src={file.url} alt={file.name} />
                    )}
                  </Box>
                ))}
              </Box>
            )} */}
            {thread.files && thread.files.length > 0 && (
  <Box sx={{ mb: 2 }}>
    {thread.files.map(file => (
      <Box key={file.id} sx={{ mb: 1 }}>
        {file.name.endsWith('.pdf') ? (
          <a href={file.url} target="_blank" rel="noopener noreferrer">
            <Typography variant="body2" color="text.primary">{file.name}</Typography>
          </a>
        ) : file.name.endsWith('.mp4') ? (
          <PreviewVideo controls src={file.url} />
        ) : (
          <PreviewImage src={file.url} alt={file.name} />
        )}
      </Box>
    ))}
  </Box>
)}

            <Divider sx={{ mb: 2 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Tooltip title="Like">
                  <LikeButton 
                    aria-label="like" 
                    onClick={() => handleLike(thread.id)} 
                  >
                    <ThumbUpIcon color={thread.likedByUser ? 'primary' : 'action'} />
                  </LikeButton>
                </Tooltip>
                <Typography variant="body2" sx={{ ml: 1, fontWeight: 'bold', color: 'black' }}>{thread.likes}</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <ActionButton 
                  size="small" 
                  onClick={() => handleComment(thread.id)} 
                >
                  <CommentIcon sx={{ mr: 1 }} /> Comment
                </ActionButton>
                <ActionButton 
                  size="small" 
                  onClick={() => navigate(`/posts/${thread.id}`)} 
                >
                  View Post
                </ActionButton>
              </Box>
            </Box>
            {thread.id === selectedThread && (
              <CommentSection>
                <TextField
                  fullWidth
                  label="Add a comment"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  margin="normal"
                  variant="outlined"
                />
                <Button 
                  variant="contained" 
                  color="primary" 
                  onClick={handleAddComment} 
                  sx={{ mt: 1, borderRadius: 20, boxShadow: 2, '&:hover': { boxShadow: 4 } }}
                >
                  Submit Comment
                </Button>
                <List sx={{ mt: 2 }}>
                  {thread.comments.map((comment, index) => (
                    <ListItem key={index}>
                      <ListItemText primary={comment} />
                    </ListItem>
                  ))}
                </List>
              </CommentSection>
            )}
          </CardContent>
        </EnhancedCard>
      ))}
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <ModalBox>
          <Typography id="modal-modal-title" variant="h6" component="h2">Ask a Question</Typography>
          <TextField
            fullWidth
            name="title"
            label="Title"
            value={newQuestion.title}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
          />
          <TextField
            fullWidth
            name="content"
            label="Content"
            value={newQuestion.content}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            multiline
            rows={4}
          />
          <input
            type="file"
            accept="image/*,application/pdf,video/*"
            onChange={handleFileChange}
            style={{ marginTop: 16, width: '100%' }}
          />
          {selectedFile && (
            <FilePreview>
              {selectedFile.type.endsWith('pdf') ? (
                <a href={URL.createObjectURL(selectedFile)} target="_blank" rel="noopener noreferrer">
                  <Typography variant="body2" color="text.primary">{selectedFile.name}</Typography>
                </a>
              ) : selectedFile.type.startsWith('video/') ? (
                <PreviewVideo controls src={URL.createObjectURL(selectedFile)} />
              ) : (
                <PreviewImage src={URL.createObjectURL(selectedFile)} alt={selectedFile.name} />
              )}
              <IconButton 
                onClick={handleRemoveFile} 
                sx={{ position: 'absolute', top: 0, right: 0, color: 'red' }}
              >
                <ClearIcon />
              </IconButton>
            </FilePreview>
          )}
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleSubmit} 
            sx={{ mt: 2, borderRadius: 20, boxShadow: 2, '&:hover': { boxShadow: 4 } }}
          >
            Submit
          </Button>
        </ModalBox>
      </Modal>
    </Container>
  );
};

export default ThreadPage;
