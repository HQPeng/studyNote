- git add 文件名 ：提交到暂存区

- git commit - m "信息"  ：提交到版本库，并添加信息，如果不写，会自动跳到自带的编辑器，让你写信息的

- git log ：查看当前指针（当前）以及之前的提交的版本记录，看不到当前之后的提交记录

- git reflog ：查看所有的操作，包括每次的add 和commit以及其他修改

- git reset hard HEAD^   :工作区返回到上一个版本   
  - 或者是先用refllog查看想要到的版本的前面七个数字子母组成的标识符 ，然后 git reset hard xxxxxx  回到想回到的版本

- git reset soft HEAD :回退到本版本的缓存区， 可以写重新提交的注释，也可以改了该版本的内容再重新提交

- git commit --amend ：会进入编辑器重写最近一次提交信息

- git revert head ：工作区回到上个版本，**但是会生成一个新的记录，相当于把上个版本复制了**

  - git revert xxxx  ：工作区回到固定的版本


- git branch -D 名字  :删除分支

- git push origin --delete branch_name：删除远程分支

  ​

  ------

  提交到GitHub上面时候，输密码是看的电脑上面凭证的

- git remote add xxx http：   ：添加一个仓库地址名字为xxx 一般是origin

- 从远程中拉取分支：git pull 本地名字：远程名字   ：如果本地没有，会被自动创建

- 从给远程创建分支：git push 本地名字：远程名字 ：如果远程没有，会自动创建

- git fetch origin 远程分支名：本地分支名：

  从远程仓库获取最新的分支信息，但不会自动合并或更新你的本地分支


- git meger 分支名：把是这个分支往当前所在的分支合并，处理完合并后，要重新add commit

  - 如果在push远程时候出现冲突，也是一样，处理后再add commit

- fork：将项目全部整到自己的远程仓库下，想修改，再clong

  ---

  分支的push跟pull在默认的情况下，是会找远程的同名分支对应的

  - git branch -vv：查看当前分支和远程分支的关联，就是当前的分支的push和pull是跟远程的谁挂钩


- git branch --set-upstream-to=origin/dev dev：设置远程的dev和本地的dev挂钩

  ​