/* eslint-disable prettier/prettier */
import { Medcategory } from "src/medcategories/entities/medcategory.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'tb_medicines'})
export class Medicine {

    @PrimaryGeneratedColumn({name: 'int_id_medicine'})
    id: number;

    @Column({name: 'str_comercial_name_medicine', type: 'varchar', length: 255, nullable: false})
    name_medicine: string;

    @Column({name: 'str_generic_name_medicine', type: 'varchar', length: 255, nullable: false, unique: true})
    generic_name: string;

    @ManyToOne( () => Medcategory, (category) => category.medicines )
    category: Medcategory;
}
