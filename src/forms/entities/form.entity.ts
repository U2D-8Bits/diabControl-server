/* eslint-disable prettier/prettier */
import { Inform } from "src/informs/entities/inform.entity";
import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Form {

    @PrimaryGeneratedColumn()
    id_form: number;

    @Column({ type: 'varchar', length: 255, nullable: false })
    form_title: string;

    // Tipo de diabetes
    @Column({ type: 'varchar', length: 255, nullable: false })
    form_diabetes_type: string;

    // Monitoreo de glucosa
    @Column({ type: 'varchar', length: 255, nullable: true })
    form_glucose_mesure_date: string;

    @Column({ type: 'float', nullable: true })
    form_glucose_level: number;

    @Column({ type: 'varchar', length: 255, nullable: true })
    form_glucose_mesure_frequency: string;

    @Column({ type: 'float', nullable: true })
    form_glucose_average_level: number;

    // Habitos de alimentación
    @Column({type: 'boolean', nullable: true})
    form_eat_habits: boolean;

    @Column({type: 'varchar', length: 255, nullable: true})
    form_eat_habits_description: string;

    // Actividad física
    @Column({type: 'boolean', nullable: true})
    form_physical_activity: boolean;

    @Column({type: 'varchar', length: 255, nullable: true})
    form_physical_activity_description: string;

    @Column({type: 'varchar', length: 255, nullable: true})
    form_physical_activity_frequency: string;

    // Otras complicaciones
    @Column({type: 'boolean', nullable: true})
    form_blurred_vision: boolean;

    @Column({type: 'boolean', nullable: true})
    form_slow_healing: boolean;

    @Column({type: 'boolean', nullable: true})
    form_tingling_numbness: boolean;

    @Column({type: 'boolean', nullable: true})
    form_extreme_faigue: boolean;

    @Column({type: 'boolean', nullable: true})
    form_incresed_thirst: boolean;

    // Objetivos

    @Column({ type: 'varchar', length: 255, nullable: true })
    form_diabetes_objective: string;

    //Preguntas adicionales
    @Column({ type: 'varchar', length: 255, nullable: true })
    form_additional_questions: string;


    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @ManyToOne( () => User, user => user.forms, {onDelete: 'CASCADE'} )
    user: User;

    @OneToMany( () => Inform, inform => inform.form)
    informs: Inform[];

}

