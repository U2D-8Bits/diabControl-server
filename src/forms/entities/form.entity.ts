/* eslint-disable prettier/prettier */
import { Inform } from "src/informs/entities/inform.entity";
import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name: 'tb_forms'})
export class Form {

    @PrimaryGeneratedColumn({name:'int_id_form'})
    id_form: number;

    @Column({ name: 'str_form_title', type: 'varchar', length: 255, nullable: false })
    form_title: string;

    // Tipo de diabetes
    @Column({name: 'str_form_diabetes_type', type: 'varchar', length: 255, nullable: false })
    form_diabetes_type: string;

    // Monitoreo de glucosa
    @Column({name: 'str_form_glucose_mesure_date', type: 'varchar', length: 255, nullable: true })
    form_glucose_mesure_date: string;

    @Column({name: 'int_form_glucose_level', type: 'float', nullable: true })
    form_glucose_level: number;

    @Column({name: 'str_form_glucose_mesure_frequency', type: 'varchar', length: 255, nullable: true })
    form_glucose_mesure_frequency: string;

    @Column({name: 'str_form_glucose_average_level', type: 'float', nullable: true })
    form_glucose_average_level: number;

    // Habitos de alimentación
    @Column({name: 'bool_form_eat_habits', type: 'boolean', nullable: true})
    form_eat_habits: boolean;

    @Column({name: 'str_form_eat_habits_description', type: 'varchar', length: 255, nullable: true})
    form_eat_habits_description: string;

    // Actividad física
    @Column({name: 'bool_form_physical_activity', type: 'boolean', nullable: true})
    form_physical_activity: boolean;

    @Column({name: 'str_form_physical_activity_description', type: 'varchar', length: 255, nullable: true})
    form_physical_activity_description: string;

    @Column({name: 'str_form_physical_activity_frequency', type: 'varchar', length: 255, nullable: true})
    form_physical_activity_frequency: string;

    // Otras complicaciones
    @Column({name: 'bool_form_blurred_vision', type: 'boolean', nullable: true})
    form_blurred_vision: boolean;

    @Column({name: 'bool_form_slow_healing', type: 'boolean', nullable: true})
    form_slow_healing: boolean;

    @Column({name: 'bool_form_tingling_numbness', type: 'boolean', nullable: true})
    form_tingling_numbness: boolean;

    @Column({name: 'bool_form_extreme_faigue', type: 'boolean', nullable: true})
    form_extreme_faigue: boolean;

    @Column({name: 'bool_form_incresed_thirst', type: 'boolean', nullable: true})
    form_incresed_thirst: boolean;

    //Preguntas adicionales
    @Column({name: 'str_form_additional_questions',  type: 'varchar', length: 255, nullable: true })
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

