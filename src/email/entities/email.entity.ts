import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("generated_emails")
export class EmailEntity{
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({type: 'text'})
    raw_message: string;

    @Column({type: 'varchar', length: 50})
    type: string;

    @Column({type:'varchar', length: 255, nullable: true})
    tone: string | null;

    @Column({type: 'varchar', length: 200, nullable: true})
    target_audience: string | null;

    @Column({type: 'text'})
    generated_subject: string;

    @Column({type: 'text'})
    generated_body: string;

    @Column({type: 'varchar', length: 50, nullable: true})
    model_used: string | null;

    @CreateDateColumn({type: 'timestamp'})
    created_at: Date;

    @UpdateDateColumn({type: 'timestamp'})
    updated_at: Date;

    @Column({type:'timestamp', default: () => "CURRENT_TIMESTAMP AT TIME ZONE 'Asia/Kolkata'"})
    created_at_ist: Date;

    @Column({type:'timestamp', default: () => "CURRENT_TIMESTAMP AT TIME ZONE 'Asia/Kolkata'"})
    updated_at_ist: Date;
}