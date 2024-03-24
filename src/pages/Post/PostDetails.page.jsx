import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DOMAIN from "../../services/endpoint";
import axios from "axios";
import { Button, Container, Card, Image, Text, Group, Badge } from "@mantine/core";
import { useLoaderData } from "react-router-dom";
import classes from './PostDetails.module.css';
import { SimpleGrid, Skeleton, rem } from '@mantine/core'; 
import { Loader } from '@mantine/core';
const PRIMARY_COL_HEIGHT = rem(300);

function PostDetailsPage() {

  const [loading, setLoading] = useState(false); 

  const post = useLoaderData(); 

  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(post.content);
  const [postContent,setPostContent] = useState(post.content)

  

  if (!post || loading) { // Render loadinrun g spinner if post data is not available or loading is true
    return (
      <Container>
        <Loader size="md" />
      </Container>
    );
  }

  const handleEditClick = () => {
    setIsEditing(true);
  };
  
  const handleSaveClick = async () => {

    try {
      const response = await axios.put(`${DOMAIN}/api/posts/${post.id}`, { content: editedContent });
      setPostContent(editedContent)
      console.log("Response from server:", response.data);

      setIsEditing(false);

    } catch (error) {
      console.error("Error updating post content:", error);
      setLoading(true);
    }
  };

  if (!post) {
    // Handle the case where post details are not available
    return (
      <Container>
        <Skeleton height={PRIMARY_COL_HEIGHT} radius="md" animate={false} />
      </Container>
    );
  }

  return (
    <Container>
      <SimpleGrid cols={{ base: 1, md: 2 }} spacing="md">
        {/* Left column with image */}
        <Card withBorder radius="xl" p="xl" className={classes.card}>
          <Card.Section>
            <Image src={post.image} alt={post.title} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', borderRadius: 30 }} />
          </Card.Section>
        </Card>

        {/* Right column with post details */}
       
        <Card withBorder radius="xl" p="xl" className={classes.card}>
          <Card.Section className={classes.section}>
            <Group justify="apart">
              <Text fz="lg" fw={500}>
             
                <Badge size="lg" variant="filled">Title: {post.title} </Badge>
              </Text>
              <Badge size="md" variant="light">
                Author : {post.author?.email} {/* Null-checking for author */}
              </Badge>
              <Badge size="md" variant="light">
                Category : {post.category} 
              </Badge>
            </Group>
            {isEditing ? (
              <textarea
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                rows={5}
                cols={40}
              />
            ) : (
              <Text fz="sm" mt="xs">
                {postContent}
              </Text>
            )}
            {!isEditing && (
              <Button onClick={handleEditClick}>Edit</Button>
            )}
            {isEditing && (
              <Button onClick={handleSaveClick}>Save</Button>
            )}
          </Card.Section>
        </Card>
      </SimpleGrid>

      <Button>
        <Link to="/posts">Back to Posts</Link>
      </Button>
    </Container>
  );
}

export const postDetailsLoader = async ({ params }) => {
  console.log("Params:", params);
  const { id } = params;

  try {
    // Fetch post details
    const postResponse = await axios.get(`${DOMAIN}/api/posts/${id}`);
    const post = postResponse.data;
    return post;
  } catch (error) {
    console.error("Error fetching post details:", error);
    return null;
  }
}

export default PostDetailsPage;