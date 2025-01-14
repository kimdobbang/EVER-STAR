package com.everstarbackauth.global.security.auth;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Map;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.user.OAuth2User;

import com.everstarbackauth.domain.user.model.User;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
public class PrincipalDetails implements UserDetails, OAuth2User {

	@Getter
	private User user;
	private Map<String, Object> attributes;

	public PrincipalDetails(User user) {
		this.user = user;
	}

	@Override
	public Map<String, Object> getAttributes() {
		return attributes;
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		Collection<GrantedAuthority> authorities = new ArrayList<>();
		this.user.getMemberRoles().forEach((r) -> {
			authorities.add(() -> r.getRole());
		});
		return authorities;
	}

	//일반 로그인
	@Override
	public String getPassword() {
		return this.user.getPassword();
	}

	@Override
	public String getUsername() {
		return this.user.getEmail();
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}

	@Override
	public String getName() {
		return this.user.getEmail();
	}
}
