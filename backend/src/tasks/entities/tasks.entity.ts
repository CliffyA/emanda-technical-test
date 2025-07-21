import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column({ nullable: true })
  parentId?: number;

  @ManyToOne(() => Task, (task) => task.subtasks, { nullable: true, onDelete: "CASCADE" })
  @JoinColumn({ name: 'parentId' })
  private parent?: Task;

  @OneToMany(() => Task, (task) => task.parent)
  private subtasks!: Task[];
}
