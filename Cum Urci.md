# Proiect WEB

### Cum sa incarci ce ai lucrat pe git:
```sh
$ git checkout -b branch_name
```
Change to your branch(vezi numele mai jos)

```sh
$ git add .
``` 
Adds the file to your local repository and stages it for commit. To unstage a file, use 'git reset HEAD YOUR-FILE'

```sh
$ git status
```
Displays the state of the working directory and the staging area. It lets you see which changes have been staged, which haven't, and which files aren't being tracked by Gi
```sh
$ git commit -m "Add existing file"
```
Commits the tracked changes and prepares them to be pushed to a remote repository.  To remove this commit and modify the file, use 'git reset --soft HEAD~1' and commit and add the file again.

```sh
$ git status
```

```sh
$ git push origin your-branch
```
Pushes the changes in your local repository up to the remote repository you specified as the origin

Daca esti cu un commit in urma branch-ului
```sh
$ git pull origin your-branch
```
Used to fetch and download content from a remote repository and immediately update the local repository to match that content.


Mai multe detalii: [Aici](https://docs.github.com/en/free-pro-team@latest/github/managing-files-in-a-repository/adding-a-file-to-a-repository-using-the-command-line) 

<<<<<<< HEAD
### Nume branchs
 > Sebi: Sebi's-branch
 
 > Madalin: Madalin's-branch
 
 > Munte: Munte's-branch
 
 > Daniel: Daniel's-branch
=======
### Ce avem de facut:
 > Sebi:Sebi's-branch

 > Madalin:Madalin's-branch

 > Munte:Madalin's-branch
 
 > Daniel:Daniel's-branch
>>>>>>> 3d592c50be99e571524d62dc5edc013b8e966077
