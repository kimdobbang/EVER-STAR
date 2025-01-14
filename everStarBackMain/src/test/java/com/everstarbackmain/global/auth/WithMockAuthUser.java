package com.everstarbackmain.global.auth;

import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;

import org.springframework.security.test.context.support.WithSecurityContext;


import com.everstarbackmain.domain.user.model.Role;

@Retention(RetentionPolicy.RUNTIME)
@WithSecurityContext(factory = WithMockSecurityContext.class)
public @interface WithMockAuthUser {
	String email();
	Role role();
}
