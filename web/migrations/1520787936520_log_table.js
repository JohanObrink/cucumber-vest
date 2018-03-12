exports.up = (pgm) => {
  pgm.createTable('log', {
    id: {type: 'bigserial', primaryKey: true},
    event_type: {type: 'text', notNull: true},
    user_id: {type: 'text', notNull: true},
    data: {type: 'jsonb'},
    timestamp: {type: 'timestamp', notNull: true}
  })
}

exports.down = (pgm) => {
  pgm.dropTable('log')
}
