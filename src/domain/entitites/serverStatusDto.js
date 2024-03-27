class ServerStatusDto {
  constructor(platform, status, maintenance, impactedFeatures) {
    (this.platform = platform),
      (this.status = status),
      (this.maintenance = maintenance),
      (this.impactedFeatures = impactedFeatures);
  }
}

export default ServerStatusDto;
