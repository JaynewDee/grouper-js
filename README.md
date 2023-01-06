# CLI-based Student Management

## INSTALLATION

- After cloning, install the project as a global npm package:
  > - (from root): `npm i -g .`
  > - close all terminals
  > - run `grouper` at the terminal to verify installation

## BASIC USAGE

| Command                      | Description                                                                                            | Options                                                                                                                                                      |
| ---------------------------- | ------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `color-list`                 | List students and color code by GPA                                                                    | N/A                                                                                                                                                          |
| `add-student`                | Manually add a single student                                                                          | N/A                                                                                                                                                          |
| `import <file-path>`         | Import local file                                                                                      | `file-path` Path to local file (required)                                                                                                                    |
| `export`                     | Export current class collections                                                                       | `-ft --filetype <type>` Type of export file, default: csv <br> `-ct --collection-type <type>` Type of collection to export, default: students, other: groups |
| `create-groups <num-groups>` | Create a given number of groups                                                                        | `num-groups` Number of groups to create (required)                                                                                                           |
| `empty`                      | Clear specified filestore                                                                              | **interactive**                                                                                                                                              |
| `assign <path>`              | Parse file -> Write students to collections -> Create and assign groups -> Write groups to collections | `path` Path to BootCampSpot export                                                                                                                           |

### HOW TO CONTRIBUTE
