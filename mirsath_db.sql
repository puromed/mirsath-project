INSERT INTO mirsath.members (user_id,name,ic_number,house_no,street_address,postcode,city,state,phone_number,date_of_birth,membership_start_date,status,next_of_kin_name,next_of_kin_phone,next_of_kin_relationship,created_at,updated_at) VALUES
	 (1,'Mohammad Arfan Haziq Bin Razlan','030303101261','9','jalan sp1/6','42610','Setia Alam','Selangor','0166470305','2025-07-13','2025-07-13','Pending','nor ain irdina','01121101065','Spouse','2025-07-13 05:47:29','2025-07-13 05:47:29');
INSERT INTO mirsath.migrations (migration,batch) VALUES
	 ('0001_01_01_000001_create_cache_table',1),
	 ('0001_01_01_000002_create_jobs_table',1),
	 ('2025_07_10_164635_create_users_table',1),
	 ('2025_07_10_164636_create_members_table',1),
	 ('2025_07_10_164818_create_staff_table',1),
	 ('2025_07_10_164940_create_staff_accounts_table',1),
	 ('2025_07_10_165607_create_dependents_table',1),
	 ('2025_07_10_165723_create_claims_table',1),
	 ('2025_07_10_165818_create_payments_table',1);
INSERT INTO mirsath.sessions (id,user_id,ip_address,user_agent,payload,last_activity) VALUES
	 ('AvTq45toWYN0D9DgGbmXfPgIv2QPYDSdGmwuc5Tg',1,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36','YTo0OntzOjY6Il90b2tlbiI7czo0MDoicFN6TFd3VFdLUmlCdm1LN2hLaldjZmUyYVJRb0VhUGZXREdreDA5ZiI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzM6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9hZG1pbi9sb2dpbiI7fXM6NTI6ImxvZ2luX3N0YWZmXzU5YmEzNmFkZGMyYjJmOTQwMTU4MGYwMTRjN2Y1OGVhNGUzMDk4OWQiO2k6MTt9',1752399997);
INSERT INTO mirsath.staff (name,email,`role`,created_at,updated_at) VALUES
	 ('Admin MIRSATH','admin@mirsath.my','Admin','2025-07-13 09:11:55','2025-07-13 09:11:55');
INSERT INTO mirsath.staff_accounts (staff_id,email,password,created_at,updated_at) VALUES
	 (1,'admin@mirsath.my','$2y$12$XSP0bV3K4Hmj7hsAbLegsOYGMjwjELY3yeeaqn8b0yrdmsifuLdli','2025-07-13 09:17:24','2025-07-13 09:17:24');
INSERT INTO mirsath.users (name,email,email_verified_at,password,remember_token,created_at,updated_at) VALUES
	 ('Mohammad Arfan Haziq Bin Razlan','afan22@gmail.com',NULL,'$2y$12$E8ub7a7vfFvPE.FFK4O44eylgepwUw4HjGkCTm2hr.ILIxBxOnKC2',NULL,'2025-07-13 05:47:28','2025-07-13 05:47:28');
