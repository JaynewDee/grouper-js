# CLI-based Student Management

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## The Reason

> - To eliminate the burden of manual orchestration of balanced student teams
>   by automating their assignment.
> - To make classroom grouping decisions
>   as fast, simple, and equitable as possible.

---

## Getting started

**Note!**: Though this project is written in JavaScript and distributed as an NPM package,  
it does not require any programming ability to use. The only requirement is that the user have access to  
NPM/Node from within a terminal.


- Install the project as a global npm package:
  > - `npm i -g group-maker`
  > - close all terminals
  > - run `grouper` at the terminal to verify installation

---

## BASIC USAGE

| Command                                             | Description                                                | Options                       |
| --------------------------------------------------- | ---------------------------------------------------------- | ----------------------------- |
| `assign <path>` relative path to bcs gradebook file | Parse file -> Create Groups -> Output group results as csv | `-s <size>` target group size |
