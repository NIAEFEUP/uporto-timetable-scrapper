module.exports = (sequelize, DataTypes) => {
    var courseUnit = sequelize.define('courseUnit', {
        course_unit_id: {
            type: DataTypes.INTEGER
        },
        course_id: {
            type: DataTypes.INTEGER
        },
        name: {
            type: DataTypes.STRING
        },
        acronym: {
            type: DataTypes.STRING
        },
        url: {
            type: DataTypes.STRING(2000)
        },
        schedule_url: {
            type: DataTypes.STRING(2000)
        },
        course_year: {
            type: DataTypes.INTEGER
        },
        semester: {
            type: DataTypes.INTEGER
        },
        year: {
            type: DataTypes.INTEGER
        }
    }, {
        tableName: 'course_unit',
        underscored: true,
        timestamps: false,
    });

    courseUnit.associate = function (models) {
        models.courseUnit.belongsTo(models.course);
        models.courseUnit.hasMany(models.schedule);
    }

    return courseUnit;
}