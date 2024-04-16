"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";

import { TodoItemType } from "@/types";
import TodoItem from "./components/TodoItem/TodoItem";
import TitleBox from "./components/TitleBox/TitleBox";

import styles from "./page.module.css";
import React from "react";
import Image from "next/image";

export default function Page() {
  // state for todos, input text, and error message
  const [todos, setTodos] = useState<TodoItemType[]>([]);
  const [inputText, setInputText] = useState("");
  const [message, setMessage] = useState("");
  // reference to input element
  const inputRef = useRef<HTMLInputElement>(null);

  // handle input change
  const handleInput = () => {
    if (inputRef.current === null) return;
    setInputText(inputRef.current.value);
  };

  // send a POST request to the server to add a new todo 
  const addTodo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!inputText) {
        setMessage("Please enter a task");
        return;
      }
      const newTodo: TodoItemType = {
        id: Date.now().toString(),
        task: inputText,
        completed: false,
      };

      const res = await fetch(`/api/todos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ todo: newTodo }),
      });
      if (res.status === 200) {
        setTodos([...todos, newTodo]);
        setInputText("");
      } else {
        setMessage("Failed to add todo");
      }
    } catch (error) {
      console.log(error);
      setMessage("Failed to add todo");
    }
  };

  // send a PUT request to the server to update a todo
  const updateTodo = async (id: string, completed: boolean) => {
    try {
      const res = await fetch(`/api/todos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ completed: !completed }),
      });
      if (res.status === 200) {
        const updatedTodos = todos.map((todo) =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        );
        setTodos(updatedTodos);
      } else {
        setMessage("Failed to update todo");
      }
    } catch (error) {
      setMessage("Failed to update todo");
    }
  };

  // send a DELETE request to the server to delete a todo
  const deleteTodo = async (id: string) => {
    try {
      const res = await fetch(`/api/todos/${id}`, {
        method: "DELETE",
      });
      if (res.status === 200) {
        const updatedTodos = todos.filter((todo) => todo.id !== id);
        setTodos(updatedTodos);
      } else {
        setMessage("Failed to delete todo");
      }
    } catch (error) {
      setMessage("Failed to delete todo");
    }
  };

  // clear error message after 1 second
  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage("");
    }, 1000);
    return () => clearTimeout(timer);
  }, [message]);

  // fetch todos from the server when the component mounts
  useEffect(() => {
    (async () => {
      const response = await fetch(`/api/todos`);
      const data = await response.json();
      setTodos(data.todos);
    })();
  }, []);

  return (
    <div id="root">
      <header className={styles.header}>
        <a href="https://nextjs.org/" target="_blank">
          <Image
            sizes="100vw"
            width={300}
            height={200}
            src="/next.svg"
            className={clsx(styles.logo, styles.node)}
            alt="Next.js logo"
          />
        </a>
      </header>
      <main className={styles.main}>
        <TitleBox key={todos.length} />
        <form className={styles.form} onSubmit={addTodo}>
          <input
            className={styles.input}
            ref={inputRef}
            value={inputText}
            type="text"
            onChange={handleInput}
          />
          <button className={styles.submitButton} type="submit">
            ADD
          </button>
        </form>

        <ul className={styles.ul}>
          <AnimatePresence>
            {todos &&
              todos.length &&
              todos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  item={todo}
                  updateTodo={() => {
                    updateTodo(todo.id, todo.completed);
                  }}
                  deleteTodo={() => {
                    deleteTodo(todo.id);
                  }}
                />
              ))}
          </AnimatePresence>
        </ul>

        <AnimatePresence>
          {message && (
            <motion.div
              initial={{ opacity: 0, x: "-50%", y: "200%" }}
              animate={{ opacity: 1, x: "-50%", y: "0%" }}
              exit={{ opacity: 0, x: "-50%", y: "200%" }}
              transition={{ duration: 0.25 }}
              className={styles.errorMessage}
            >
              <p>{message}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
