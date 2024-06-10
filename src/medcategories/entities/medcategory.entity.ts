/* eslint-disable prettier/prettier */
import { Medicine } from "src/medicines/entities/medicine.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'tb_med_categories'})
export class Medcategory {

    @PrimaryGeneratedColumn({name: 'int_id_med_category'})
    id: number;

    @Column({name: 'str_name_med_category', type: 'varchar', length: 255, nullable: false})
    name_category: string;

    @OneToMany( () => Medicine, medicine => medicine.category)
    medicines: Medicine[];

}
