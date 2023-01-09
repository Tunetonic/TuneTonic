import { MigrationInterface, QueryRunner, Table, TableColumn } from "typeorm"

export class GenreDistribution1673268340606 implements MigrationInterface {
    columns: TableColumn[] = [
        new TableColumn({
            name: 'id',
            type: 'int',
            isNullable: false,
            isGenerated: true,
            generationStrategy: 'uuid',
            isPrimary: true
        }),
        new TableColumn({
            name: 'rock',
            type: 'int',
            isGenerated: false,
            isPrimary: false
        }),
        new TableColumn({
            name: 'rock',
            type: 'int',
            isGenerated: false,
            isPrimary: false
        })

    ]
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'genre_dist',
            columns: this.columns
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
