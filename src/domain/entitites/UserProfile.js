export class UserProfile {
  constructor(profileId, userId, platformType, idOnPlatform, nameOnPlatform, avatars) {
    (this.profileId = profileId),
      (this.userId = userId),
      (this.platformType = platformType),
      (this.idOnPlatform = idOnPlatform),
      (this.nameOnPlatform = nameOnPlatform),
      (this.avatars = avatars);
  }
}
