INSERT INTO mirsath.claims (member_id,deceased_person_id,deceased_person_type,date_of_death,death_certificate_url,status,payout_amount,approved_by_staff_id,decision_date,decision_notes,submission_date,created_at,updated_at) VALUES
	 (1,5,'Dependent','2025-07-15',NULL,'Pending Review',NULL,NULL,NULL,NULL,NULL,'2025-07-16 19:46:57','2025-07-16 19:46:57'),
	 (1,5,'Dependent','2025-07-15','certificates/FC8UuqWuPbhVCQVjTeWpgFbr4KiYDOMRAq65OpPm.pdf','Pending Review',NULL,NULL,NULL,NULL,NULL,'2025-07-18 07:16:42','2025-07-18 07:16:42'),
	 (1,6,'Dependent','2025-07-15','certificates/rz9dXyCDl0l9MgtrCDpTpaXsJmn3O1o1ccHw1AlN.pdf','Pending Review',NULL,NULL,NULL,NULL,NULL,'2025-07-18 07:29:23','2025-07-18 07:29:23');
INSERT INTO mirsath.dependents (member_id,name,ic_number,relationship,date_of_birth,status,created_at,updated_at) VALUES
	 (1,'Razlan Osman','724578982123','Parent','1972-03-20','Active','2025-07-16 13:18:08','2025-07-16 13:18:08'),
	 (1,'Kaka','987564949454','Spouse','2003-03-30','Active','2025-07-16 19:35:18','2025-07-16 19:35:18'),
	 (1,'Luffy','241568439395','Child','2024-03-14','Active','2025-07-18 07:14:59','2025-07-18 07:14:59');
INSERT INTO mirsath.members (user_id,name,ic_number,house_no,street_address,postcode,city,state,phone_number,date_of_birth,membership_start_date,status,has_seen_status_update,next_of_kin_name,next_of_kin_phone,next_of_kin_relationship,created_at,updated_at) VALUES
	 (1,'Mohammad Arfan Haziq Bin Razlan','030303101261','9','jalan sp1/6','42610','Setia Alam','Selangor','0166470305','2025-07-13','2025-07-13','Active',0,'nor ain irdina','01121101065','Spouse','2025-07-13 05:47:29','2025-07-14 18:29:56'),
	 (2,'amad bin ali','123456789102','10','Jalan setia alam','40170','Setia Alam','Selangor','0123456789','2025-07-17','2025-07-14','Active',0,'ali','01454545454','Sibling','2025-07-14 18:16:13','2025-07-14 18:39:50'),
	 (3,'cubaan','123456712345','12','jalan terus','40170','Setia Alam','Selangor','0156782321','2025-07-17','2025-07-14','Active',0,'damon albarn','0181010101','Child','2025-07-14 20:59:41','2025-07-14 21:01:03');
INSERT INTO mirsath.migrations (migration,batch) VALUES
	 ('0001_01_01_000001_create_cache_table',1),
	 ('0001_01_01_000002_create_jobs_table',1),
	 ('2025_07_10_164635_create_users_table',1),
	 ('2025_07_10_164636_create_members_table',1),
	 ('2025_07_10_164818_create_staff_table',1),
	 ('2025_07_10_164940_create_staff_accounts_table',1),
	 ('2025_07_10_165607_create_dependents_table',1),
	 ('2025_07_10_165723_create_claims_table',1),
	 ('2025_07_10_165818_create_payments_table',1),
	 ('2025_07_14_182242_modify_status_column_in_members_table',2);
INSERT INTO mirsath.migrations (migration,batch) VALUES
	 ('2025_07_14_205419_add_has_seen_status_update_to_members_table',3),
	 ('2025_07_16_093358_update_column_lengths_in_dependents_table',4),
	 ('2025_07_16_194033_alter_claims_nullable_columns',5),
	 ('2025_07_16_194307_create_users_table',5),
	 ('2025_07_16_194610_alter_claims_submission_date_nullable',6),
	 ('2025_07_18_081918_add_review_fields_to_claims_table',7);
INSERT INTO mirsath.payments (member_id,claim_id,amount,purpose,transaction_date,created_at,updated_at) VALUES
	 (1,NULL,60.00,'MembershipFee','2025-07-16','2025-07-16 13:11:27','2025-07-16 13:11:27');
INSERT INTO mirsath.sessions (id,user_id,ip_address,user_agent,payload,last_activity) VALUES
	 ('eDr7age0XjFOtW567Aw7pfvtUx5u62iojVLbG0yu',NULL,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36','YTozOntzOjY6Il90b2tlbiI7czo0MDoiUnZXellMOFZVeFV3cDY4ZW9pMnFSZFRUc0gxVzZ3M0lVV2J3WmQ5SyI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6Mjc6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9sb2dpbiI7fX0=',1752520859);
INSERT INTO mirsath.staff (name,email,`role`,created_at,updated_at) VALUES
	 ('Admin MIRSATH','admin@mirsath.my','Admin','2025-07-13 09:11:55','2025-07-13 09:11:55');
INSERT INTO mirsath.staff_accounts (staff_id,email,password,created_at,updated_at) VALUES
	 (1,'admin@mirsath.my','$2y$12$XSP0bV3K4Hmj7hsAbLegsOYGMjwjELY3yeeaqn8b0yrdmsifuLdli','2025-07-13 09:17:24','2025-07-13 09:17:24');
INSERT INTO mirsath.users (name,email,email_verified_at,password,remember_token,created_at,updated_at) VALUES
	 ('Mohammad Arfan Haziq Bin Razlan','afan22@gmail.com',NULL,'$2y$12$E8ub7a7vfFvPE.FFK4O44eylgepwUw4HjGkCTm2hr.ILIxBxOnKC2',NULL,'2025-07-13 05:47:28','2025-07-13 05:47:28'),
	 ('amad bin ali','aaa@gmail.com',NULL,'$2y$12$eM2PXo4jSYFUj.4yJmeHIOM8B9lX74/1Tont0.3BBTEWRD4GK/WYu',NULL,'2025-07-14 18:16:12','2025-07-14 19:15:50'),
	 ('cubaan','cuba@gmail.com',NULL,'$2y$12$l7QWmSPPWE.rEi0MVnd6X.qjdYurbO7BbIy2hv3XXaUuANaRqofrW',NULL,'2025-07-14 20:59:41','2025-07-14 20:59:41');
