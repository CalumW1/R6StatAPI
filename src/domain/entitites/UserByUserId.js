export class UserByUserId {
  constructor(profileId, userId, platformType, idOnPlatform, nameOnPlatform) {
    (this.profileId = profileId),
      (this.userId = userId),
      (this.platformType = platformType),
      (this.idOnPlatform = idOnPlatform),
      (this.nameOnPlatform = nameOnPlatform);
  }
}
