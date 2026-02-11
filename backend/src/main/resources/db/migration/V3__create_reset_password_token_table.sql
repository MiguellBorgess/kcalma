CREATE TABLE reset_password_tokens (
    id CHAR(36) DEFAULT (UUID()) PRIMARY KEY,
    token CHAR(50) NOT NULL,
    expiry_date TIMESTAMP NOT NULL,
    user_id CHAR(36) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);