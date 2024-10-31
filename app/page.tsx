/* "use client";

import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import "./../app/app.css";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";
import { Authenticator } from "@aws-amplify/ui-react";
import { secret } from "@aws-amplify/backend";

Amplify.configure(outputs);

const client = generateClient<Schema>();

export default function App() {
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);

  function listTodos() {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  }

  function fetchSecrets(){
    console.log(secret('my_secret'));
  }

  useEffect(() => {
    listTodos();
    // fetchSecrets();
  }, []);

  function createTodo() {
    client.models.Todo.create({
      content: window.prompt("Todo content"),
    });
  }

  function createQuestion() {
    client.models.Question.create({
      question: "Test question",
    });
  }

  function createComment() {}

  return (
    <Authenticator>
      <main>
        <h1>My todos</h1>
        <button onClick={createTodo}>+ new</button>
        <button onClick={createQuestion}>New question</button>
        <button onClick={createComment}>New comment</button>
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>{todo.content}</li>
          ))}
        </ul>
        <div>
          🥳 App successfully hosted. Try creating a new todo.
          <br />
          <a href="https://docs.amplify.aws/nextjs/start/quickstart/nextjs-app-router-client-components/">
            Review next steps of this tutorial.
          </a>
        </div>
      </main>
    </Authenticator>
  );
} */

"use client";

import "./../app/app.css";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";
import React from "react";
import { uploadData } from "aws-amplify/storage";
import { Authenticator } from "@aws-amplify/ui-react";
import { fetchAuthSession } from "aws-amplify/auth";

Amplify.configure(outputs);

const App = () => {
  const [file, setFile] = React.useState<File | undefined>();

  const handleChange = (event: any) => {
    console.log(process.env['NEXT_TEST']);
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (file) {
      try {
        const session = await fetchAuthSession();
        console.log(session);
        const result = await uploadData({
          path: ({ identityId }) => {
            console.log(identityId);
            return `private/${identityId}/AWS_S3_PRIVATE_USER_FILES_BUCKET_UPLOAD_PREFIX/${file.name}`;
          },
          data: file,
        }).result;

        console.log("File uploaded successfully", result);
      } catch (error) {
        console.error("Error uploading file", error);
      }
    } else {
      console.error("No file selected for upload");
    }
  };

  return (
    <Authenticator>
      {({ signOut, user }) => (
        <div>
          <button onClick={signOut}>Sign out</button>
          <hr />
          <input type="file" onChange={handleChange} />
          <button onClick={handleUpload}>Upload</button>
        </div>
      )}
    </Authenticator>
  );
};

export default App;
