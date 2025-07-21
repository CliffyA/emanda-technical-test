# Full Stack Engineering Challenge

Video version:
https://www.youtube.com/watch?v=688GK2-sjUQ

## Overview

My main takeaway as preparing to implement the changes needed to create tasks, was a strong feeling that the original data fetching setup will have long term scalability issues. As it's loading every task from the database, and doing so recursively, which is slower again than a simple `SELECT * FROM table;`. I'd have to refer to the long term plans for the app, maybe it is only ever expected to store a limited number of tasks, but I assume as users add content over time, performance will degrade until big sweeping changes will be needed to change how data is fetched.

Being that these changes will be needed eventually anyway, doing it before more functionality is built will be less painful, since we won't have to update that functionality to use new data access methods.

It's also a bit weird to me how `task` and `task.subTasks[0].parent` are not the same object, and that could lead to confusion later if a developer starts walking the tree backwards and ends up in a "phantom" node of the tree.

So I've decided to change things to a lazy loading system, where the subtasks are fetched on demand.

I've kept the existing database structure, but stopped fetching the `parent`/`subTasks` relationships, and exposed the `parentId` column. So now, on the default `/tasks` route, we only return the top level of tasks. From here we can use the new `:id/subTasks` route to lazy load the subTasks as the user drills down.

On the frontend, i've removed the context/provider, and replaced it with TanStack Query (aka React Query) hooks. It's particulary suited to caching, so as the user navigates around, it won't refetch any data it already has.

When creating a new task, we can selectively invalidate the query that would contain our task, to trigger a refetch of a single subtasks query, which then triggers the rerender that will display the newly created item. (I personally prefer doing things this way, instead of injecting the newly created item into the prefetched list, as we don't need to duplicate any logic to the client, eg: sorting)

The obvious drawback here is the extra server requests, but i'm making an assumption here that eventually the overhead of extra requests will be dwarfed by a single request that returns absolutely everything. And making this change will be more painful in the future once more functionality is built.

## UI Changes

I've added some error checking on the server side, and returned and displayed those errors on the frontend.

Moved the task creation form into its own component for reuse between the top level app and individual tasks.

It will also disable the input fields while the task create request is in flight, to stop the user spamming and triggeirng multiple tasks to be created.

I've also setup a quick way to expand and collapse tasks. The state for this is stored at the `TaskList` component level, that lets us auto collapse other tasks when expanding.

## AI use
I used cursor to interrogate the existing codebase and get up to speed on the new technologies i'm not fully familiar with (TypeORM, NestJS, Docker).

I also used it to quickly output code that i don't have a perfect recolection of the syntax for, like having `createTask` to return the more friendly error from the server if available, otherwise defaulting to what axios would have.

## Future Thoughts

+ There's a lot that would need to be added for this to be a real task tracking app, editing, deleting, sorting / moving tasks to different parents (drag and drop?) etc. I'll worry more about the implementation things rather than features, as a lot of that will come back to what the roadmap for the app looks like.

+ Some sort of user authentication and request validation framework. There is a security level to this, but also at the table level with user ids columns on data. If we continue to use SQLite we could shard the whole database per user.

+ There's no docker development configuration. And the way NGINX is serving the static site and proxying the dynamic backend route makes it a bit difficult to quickly setup a nicer development enviroment in the time limits given.
I did have a little play with auto rebuilding on change at least, while still pretty unfirendly, is better than manually stop/starting.

+ Speaking of NGINX, we'll also want to setup HTTPS on this before release.

+ Inline styles aren't great. Would be good to move to reusable theming for consistency across the app.

+ Also some form of backend and frontend testing should also be added for a long term project. None have been added today as setting up a testing pipeline is a bit out of scope for the time and challenge given.

+ Would also setup prettier for automatic code formatting.

+ There are several vulnarabilities in the npm packages, would be good to get those up to date.

+ These changes didn't require any migrations, as the underlying data has not changed. The API has changed, so we might want to be careful with deployment, but I think with the current state of the app, that's no big deal.

## Things I would have asked

I mentioned this earlier, but having a better idea of the roadmap and future app plans would help give context around what parts to focus on and what is good enough for today.

I had questioned things during development around switching to queries instead of the context. Should I have just extended the recursive fetchAll functionality and kept it as a talking point for later? Or should I spend a lot of time to pull it out and do something I feel is better for the future? I've gone ahead and made the changes, as that's what i'd do on the job, tho i'd certainly have a discussion before ripping up core functionality on a real app ;).